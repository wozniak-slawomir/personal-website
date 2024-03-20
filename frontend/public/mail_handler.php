<?php
    ini_set("SMTP", "smtp.slawomir-wozniak.pl");
    ini_set("sendmail_from", "postmaster@slawomir-wozniak.pl");

    $headers ="From: $_POST[email]"."\n";
    $headers .="Reply-To: $_POST[email]"."\n";
    $headers .='Content-Type: text/plain; charset="iso-8859-1"'."\n";
    $headers .='Content-Transfer-Encoding: 8bit';

    if (
        mail(
            'contact@slawomir-wozniak.pl', 
            "Message from the personal website", 
            "Contact number: ".$_POST['phone-number']." Message: ".$_POST['message'],
            $headers
        ) 
    ){
        header('Location: /?mail=success');
    } else {
        header('Location: /?mail=error');
    }
?>
