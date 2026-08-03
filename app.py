from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory database mock for V0.3.0 foundations
db_state = {
    "project": {
        "title": "Créer une application",
        "objective": "Publier un MVP",
        "deadline": "2026-09-01",
        "time_per_week": "10h"
    },
    "columns": {
        "backlog": ["Créer UI", "Créer BDD", "Connexion IA", "Sécurité OAuth", "Gestion des rôles"],
        "sprint": ["Créer interface", "Créer login"],
        "doing": ["Connexion Firebase"],
        "done": ["Création projet"],
        "increment": ["Version testable (v0.1)"]
    },
    "calendar": [
        {"day": "Lundi", "task": "Créer projet", "done": True},
        {"day": "Mardi", "task": "Login", "done": True},
        {"day": "Mercredi", "task": "Firebase", "done": True},
        {"day": "Jeudi", "task": "IA", "done": False},
        {"day": "Vendredi", "task": "Tests", "done": False}
    ],
    "metrics": {
        "project_progress": 67,
        "sprint_progress": 80,
        "backlog_count": 34,
        "doing_count": 2,
        "delay_count": 1,
        "time_saved": "4 h"
    }
}

@app.route("/")
def index():
    return render_template("index.html", data=db_state)

@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.json
    problem = data.get("problem", "")
    # Mock AI Diagnostic and initial decomposition
    response = {
        "status": "success",
        "problem": problem,
        "objective": "Publier un MVP fonctionnel",
        "risks": ["temps", "budget", "compétences", "dépendances"],
        "suggested_tasks": ["Définir les specs", "Maquettage UI", "Mise en place BDD"]
    }
    return jsonify(response)

@app.route("/api/update_columns", methods=["POST"])
def update_columns():
    req = request.json
    if "columns" in req:
        db_state["columns"] = req["columns"]
    return jsonify({"status": "updated"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
