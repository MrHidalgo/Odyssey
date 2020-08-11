<?php
  $errors         = array();      // array to hold validation errors
  $data           = array();      // array to pass back data
  $sucessMessage  = "";

  // validate the variables ======================================================
  // if any of these variables don't exist, add an error to our $errors array
  if (empty($_POST['name']))
      $errors['name'] = 'Name is required.';
  if (empty($_POST['email']))
      $errors['email'] = 'Email is required.';
  if (empty($_POST['phone']))
      $errors['phone'] = 'Phone is required.';
  if (empty($_POST['message']))
      $errors['message'] = 'Message is required.';

  $sucessMessage = "Your application has been sent successfully. We will contact you for confirmation shortly.";

  // return a response ===========================================================
  // if there are any errors in our errors array, return a success boolean of false
  if ( ! empty($errors)) {
    // if there are items in our errors array, return those errors
    $data['success'] = false;
    $data['errors']  = $errors;
  } else {
    $email_to = 'sujoy@claymx.com';
    $email_subject = "Subject";
    $email_message = "New Email from odyssey.zone\n\n";

    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    $email_message .= "Name: ".clean_string($_POST['name'])."\n";
    $email_message .= "Email: ".clean_string($_POST['email'])."\n";
    $email_message .= "Phone: ".clean_string($_POST['phone'])."\n";
    $email_message .= "Message: ".clean_string($_POST['message'])."\n";

    @mail($email_to, $email_subject, $email_message);

    // show a message of success and provide a true success variable
    $data['success'] = true;
    $data['message'] = $sucessMessage;
  }
  // return all our data to an AJAX call
  echo json_encode($data);
