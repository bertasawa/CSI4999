import csv
import re

# Main play-by-play CSV
PBP_FILE = "Player Play By Play.csv"

# Use NBA API to add points, rebounds, assists, steals, blocks, etc.
USE_NBA_API = True

# To avoid the API taking forever, this only pulls the most recent seasons from the CSV.
# Change this to None if you want to try pulling every season.
MAX_API_SEASONS_TO_FETCH = 5

# Choose how to normalize play-by-play totals:
# "game" = per-game stats
# "minute" = per-minute stats
USE_PER = "game"


# -----------------------------
# Scoring weights
# -----------------------------

# These come from nba_api season stats.
# This is the main player value score.
BOX_SCORE_WEIGHTS = {
    "PTS": 1.0,
    "REB": 1.2,
    "AST": 1.5,
    "STL": 3.0,
    "BLK": 3.0,
    "TOV": -2.0,
    "FG_PCT": 10.0,
    "FG3_PCT": 5.0,
    "FT_PCT": 3.0,
    "PLUS_MINUS": 0.3
}

# These come from Player Play By Play.csv.
# These add extra context to the box-score value.
PBP_POSITIVE_WEIGHTS = {
    "shooting_foul_drawn": 1.0,
    "offensive_foul_drawn": 1.25,
    "points_generated_by_assists": 0.15,
    "and1": 2.0,
    "fg": 0.25
}

PBP_NEGATIVE_WEIGHTS = {
    "bad_pass_turnover": 1.0,
    "lost_ball_turnover": 1.0,
    "shooting_foul_committed": 0.5,
    "offensive_foul_committed": 1.0
}

PBP_IMPACT_WEIGHTS = {
    "on_court_plus_minus_per_100_poss": 0.3,
    "net_plus_minus_per_100_poss": 0.5
}


# -----------------------------
# Helper functions
# -----------------------------

def safe_float(value):
    """Converts values to floats. Empty or bad values become 0."""
    try:
        if value is None or value == "":
            return 0.0
        return float(value)
    except ValueError:
        return 0.0


def normalize_name(name):
    """
    Makes player names easier to match between the CSV and nba_api.
    Example: "Victor Wembanyama" -> "victorwembanyama"
    """
    if name is None:
        return ""

    name = name.lower().strip()
    name = re.sub(r"[^a-z0-9]", "", name)
    return name


def normalize_stat(raw_value, games, minutes):
    """
    Converts raw totals into per-game or per-minute stats.
    """
    if USE_PER == "minute":
        if minutes == 0:
            return 0
        return raw_value / minutes

    # Default: per-game
    if games == 0:
        return 0
    return raw_value / games


def season_sort_key(season):
    """
    Converts season into a sortable number.
    Works with seasons like 2026 or 2025-26.
    """
    season = str(season).strip()

    if "-" in season:
        first, second = season.split("-")

        if len(second) == 2:
            return int(first[:2] + second)

        return int(second)

    try:
        return int(season)
    except ValueError:
        return 0


def convert_csv_season_to_nba_api_season(season):
    """
    Converts CSV seasons into nba_api season format.

    Examples:
    2026 -> 2025-26
    2025 -> 2024-25
    2025-26 -> 2025-26
    """
    season = str(season).strip()

    if "-" in season:
        parts = season.split("-")

        if len(parts[0]) == 4 and len(parts[1]) == 2:
            return season

        if len(parts[0]) == 4 and len(parts[1]) == 4:
            return f"{parts[0]}-{parts[1][-2:]}"

    try:
        ending_year = int(season)
        starting_year = ending_year - 1
        return f"{starting_year}-{str(ending_year)[-2:]}"
    except ValueError:
        return season


def calculate_confidence_level(seasons):
    """
    Confidence is based on how many seasons of data we have for the player.
    This does not change the player's score.
    It only tells us how reliable the score is.
    """
    num_seasons = len(seasons)

    if num_seasons >= 5:
        return "High"
    elif num_seasons >= 3:
        return "Medium"
    else:
        return "Low"


# -----------------------------
# NBA API functions
# -----------------------------

def calculate_box_score_score(api_player_row):
    """
    Calculates player value using traditional season stats from nba_api.
    Includes points, rebounds, assists, steals, blocks, turnovers, shooting percentages,
    and plus-minus.
    """
    if api_player_row is None:
        return 0.0

    score = 0.0

    for stat_name, weight in BOX_SCORE_WEIGHTS.items():
        value = safe_float(api_player_row.get(stat_name, 0))
        score += value * weight

    return score


def fetch_nba_api_stats(api_seasons):
    """
    Pulls player season stats from nba_api.
    Returns a dictionary keyed by:
    (api_season, normalized_player_name)
    """
    api_stats = {}

    if not USE_NBA_API:
        return api_stats

    try:
        from nba_api.stats.endpoints import leaguedashplayerstats
    except ImportError:
        print("nba_api is not installed. Using only Player Play By Play.csv.")
        return api_stats

    for api_season in api_seasons:
        try:
            print(f"Pulling nba_api stats for {api_season}...")

            stats = leaguedashplayerstats.LeagueDashPlayerStats(
                season=api_season,
                season_type_all_star="Regular Season",
                per_mode_detailed="PerGame",
                measure_type_detailed_defense="Base",
                timeout=60
            )

            df = stats.get_data_frames()[0]

            # Save a local copy so the project has the data available later.
            output_file = f"Player Season Stats {api_season}.csv"
            df.to_csv(output_file, index=False)

            for _, player_row in df.iterrows():
                player_name = player_row.get("PLAYER_NAME", "")
                name_key = normalize_name(player_name)

                api_stats[(api_season, name_key)] = player_row.to_dict()

            print(f"Saved {output_file}")

        except Exception as e:
            print(f"Could not pull nba_api stats for {api_season}.")
            print(f"Reason: {e}")

    return api_stats


# -----------------------------
# Play-by-play score functions
# -----------------------------

def calculate_play_by_play_score(row):
    """
    Calculates extra player impact using Player Play By Play.csv file.
    This is not the main score anymore.
    It is an extra adjustment added to the nba_api box-score score.
    """
    games = safe_float(row.get("g", 0))
    minutes = safe_float(row.get("mp", 0))

    score = 0.0

    # Plus-minus impact stats
    for stat_name, weight in PBP_IMPACT_WEIGHTS.items():
        value = safe_float(row.get(stat_name, 0))
        score += value * weight

    # Positive play-by-play stats
    for stat_name, weight in PBP_POSITIVE_WEIGHTS.items():
        raw_value = safe_float(row.get(stat_name, 0))
        normalized_value = normalize_stat(raw_value, games, minutes)
        score += normalized_value * weight

    # Negative play-by-play stats
    for stat_name, weight in PBP_NEGATIVE_WEIGHTS.items():
        raw_value = safe_float(row.get(stat_name, 0))
        normalized_value = normalize_stat(raw_value, games, minutes)
        score -= normalized_value * weight

    return score


def calculate_total_season_score(row, api_stats):
    """
    Calculates the full player score for one season.

    Full season score =
    nba_api box-score score
    + play-by-play score from CSV
    """
    player_name = row.get("player", "")
    csv_season = row.get("season", "")
    api_season = convert_csv_season_to_nba_api_season(csv_season)

    name_key = normalize_name(player_name)
    api_player_row = api_stats.get((api_season, name_key))

    box_score_score = calculate_box_score_score(api_player_row)
    play_by_play_score = calculate_play_by_play_score(row)

    total_score = box_score_score + play_by_play_score

    return {
        "total_score": total_score,
        "box_score_score": box_score_score,
        "play_by_play_score": play_by_play_score,
        "api_data_found": api_player_row is not None
    }


def calculate_weighted_current_score(seasons):
    """
    Gives more weight to recent seasons.

    Example:
    Oldest season weight = 1
    Next season weight = 2
    Most recent season gets the biggest weight
    """
    seasons.sort(key=lambda x: season_sort_key(x["season"]))

    weighted_total = 0.0
    total_weights = 0.0

    for index, season_data in enumerate(seasons, start=1):
        weight = index
        season_data["weight"] = weight

        weighted_total += season_data["season_score"] * weight
        total_weights += weight

    if total_weights == 0:
        return 0.0

    return weighted_total / total_weights


def find_player(choice, allplayers):
    """
    Finds player by name.
    Allows partial and lowercase searches.
    """
    choice = choice.lower().strip()
    matches = []

    for player_id, player_data in allplayers.items():
        if choice in player_data["name"].lower():
            matches.append(player_id)

    return matches


# -----------------------------
# Main program
# -----------------------------

allplayers = {}

# Step 1: Read Player Play By Play.csv
with open(PBP_FILE, mode="r", newline="", encoding="utf-8-sig") as playerdata:
    reader = csv.DictReader(playerdata)
    pbp_rows = list(reader)

# Step 2: Find seasons from the CSV and pull matching nba_api stats
api_seasons = sorted(
    {convert_csv_season_to_nba_api_season(row.get("season", "")) for row in pbp_rows},
    key=season_sort_key
)

if MAX_API_SEASONS_TO_FETCH is not None:
    api_seasons = api_seasons[-MAX_API_SEASONS_TO_FETCH:]

api_stats = fetch_nba_api_stats(api_seasons)

# Step 3: Build player records
for row in pbp_rows:
    season = row.get("season", "")
    name = row.get("player", "")
    player_id = row.get("player_id", "")
    team = row.get("team", "")

    season_score_data = calculate_total_season_score(row, api_stats)

    season_entry = {
        "season": season,
        "team": team,
        "season_score": season_score_data["total_score"],
        "box_score_score": season_score_data["box_score_score"],
        "play_by_play_score": season_score_data["play_by_play_score"],
        "api_data_found": season_score_data["api_data_found"]
    }

    if player_id not in allplayers:
        allplayers[player_id] = {
            "name": name,
            "player_id": player_id,
            "seasons": [],
            "current_score": 0.0,
            "confidence": "Low"
        }

    allplayers[player_id]["seasons"].append(season_entry)

# Step 4: Calculate current weighted score and confidence for every player
for player_id, player_data in allplayers.items():
    player_data["current_score"] = calculate_weighted_current_score(player_data["seasons"])
    player_data["confidence"] = calculate_confidence_level(player_data["seasons"])


# Step 5: User search
choice = input("Please enter a player's name: ")
matches = find_player(choice, allplayers)

if len(matches) == 0:
    print("Player not found.")

else:
    # If multiple players match, show them and use the first one
    if len(matches) > 1:
        print("\nMultiple matches found:")
        for match_id in matches:
            print(f"- {allplayers[match_id]['name']} ({match_id})")
        print("\nUsing the first match.\n")

    player_id = matches[0]
    player = allplayers[player_id]

    print()
    print(f"Player: {player['name']}")
    print(f"Player ID: {player['player_id']}")
    print(f"Current weighted player score: {player['current_score']:.2f}")
    print(f"Confidence level: {player['confidence']}")
    print(f"Seasons used: {len(player['seasons'])}")

    print("\nSeason breakdown:")
    for season_data in player["seasons"]:
        api_status = "Yes" if season_data["api_data_found"] else "No"

        print(
            f"{season_data['season']} | "
            f"Team: {season_data['team']} | "
            f"Total Score: {season_data['season_score']:.2f} | "
            f"Box Score: {season_data['box_score_score']:.2f} | "
            f"Play-by-Play: {season_data['play_by_play_score']:.2f} | "
            f"Weight: {season_data['weight']} | "
            f"NBA API Data Found: {api_status}"
        )
