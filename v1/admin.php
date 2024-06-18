<?php
// Connexion à la base de données (MySQL)
$servername = "votre_serveur";
$username = "votre_nom_utilisateur";
$password = "votre_mot_de_passe";
$dbname = "votre_base_de_donnees";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Requête SQL pour récupérer les données des contacts
$sql = "SELECT * FROM contacts";
$result = $conn->query($sql);

// Vérifier s'il y a des résultats
if ($result->num_rows > 0) {
    // Afficher les données sous forme de tableau
    echo "<table><tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Rendez-vous</th><th>Message</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr><td>" . htmlspecialchars($row["name"]) . "</td><td>" . htmlspecialchars($row["email"]) . "</td><td>" . htmlspecialchars($row["phone"]) . "</td><td>" . htmlspecialchars($row["appointment"]) . "</td><td>" . htmlspecialchars($row["message"]) . "</td></tr>";
    }
    echo "</table>";
} else {
    echo "Aucun résultat à afficher";
}

// Fermer la connexion
$conn->close();
?>
