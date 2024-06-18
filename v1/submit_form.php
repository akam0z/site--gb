<?php
// Vérifie si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collecte des données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $appointment = $_POST['appointment'] ? htmlspecialchars($_POST['appointment']) : null; // DateTimeLocal peut être vide
    $message = htmlspecialchars($_POST['message']);

    // Email de destination
    $to = "akam0z@proton.me";

    // Sujet de l'email
    $subject = "Nouveau message de contact depuis votre site web";

    // Contenu de l'email
    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Téléphone: $phone\n";
    $email_content .= "Rendez-vous: $appointment\n\n";
    $email_content .= "Message:\n$message";

    // Entêtes de l'email
    $headers = "From: $email\n";
    $headers .= "Reply-To: $email";

    // Envoi de l'email
    if (mail($to, $subject, $email_content, $headers)) {
        // Rediriger vers une page de confirmation si nécessaire
        header("Location: confirmation.html");
        exit();
    } else {
        echo "Erreur lors de l'envoi de l'email.";
    }
} else {
    // Redirection si le formulaire n'est pas soumis
    header("Location: /");
    exit();
}
?>

