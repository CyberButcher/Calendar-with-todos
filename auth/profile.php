<?php
session_start();
if (isset($_SESSION['user'])) {
  echo 'inAcc';
} else {
  echo 'notInAcc';
}