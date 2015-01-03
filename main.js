

var TTTApp = angular.module("TTTApp", ["firebase"]);



TTTApp.controller("TTTController", function ($scope, $firebase) {

  $scope.remoteGameContainer = $firebase(new Firebase("https://cosimottt.firebaseIO.com/databaseGameContainer")) ;
  
  $scope.movecounter = 0;
  $scope.xWins = false;
  $scope.oWins = false;
  $scope.tie = false;
  $scope.xWinsCounter = 0;
  $scope.oWinsCounter = 0;

  $scope.cellList = [
      {status: "B"}, {status: "B"}, {status: "B"},
      {status: "B"}, {status: "B"}, {status: "B"},
      {status: "B"}, {status: "B"}, {status: "B"}
  ];

 // This container object is what gets synced:
  $scope.gameContainer = {
    cellListArray: $scope.cellList,
    clickCounter: $scope.movecounter,
    p1Wins: $scope.xWins,
    p2Wins: $scope.oWins,
    pTie: $scope.tie,
    p1Counter: $scope.xWinsCounter,
    p2Counter: $scope.oWinsCounter,

  };

  // remoteGameContainer: that is the name you gave the Firebase collection (looks like a folder in Firebase).
  // The bind statement creates a connection between anything in your app and the Firebase connection.
   
  $scope.remoteGameContainer.$bind($scope, "gameContainer") ;

  $scope.$watch('gameContainer', function() {
    console.log('gameCountainer changed!') ;
  }) ;



  $scope.playerPicks = function(thisCell) {
    if (($scope.gameContainer.clickCounter % 2) == 1 && thisCell.status == "B") {
      thisCell.status = "X" ;  // changes cell status to x
      $scope.gameContainer.clickCounter = $scope.gameContainer.clickCounter + 1 ;
    } 
    if (($scope.gameContainer.clickCounter % 2) == 0 && thisCell.status == "B") {
      thisCell.status = "O" ; //changes cell status to o
      $scope.gameContainer.clickCounter = $scope.gameContainer.clickCounter + 1 ;
    } 

  
   
// if X wins
    if($scope.gameContainer.cellListArray[0].status == "X" && $scope.gameContainer.cellListArray[1].status == "X" && $scope.gameContainer.cellListArray[2].status == "X")
      $scope.gameContainer.p1Wins = true;
    if($scope.gameContainer.cellListArray[3].status == "X" && $scope.gameContainer.cellListArray[4].status == "X" && $scope.gameContainer.cellListArray[5].status == "X")
      $scope.gameContainer.p1Wins = true;
    if($scope.gameContainer.cellListArray[6].status == "X" && $scope.gameContainer.cellListArray[7].status == "X" && $scope.gameContainer.cellListArray[8].status == "X")
      $scope.gameContainer.p1Wins = true;
    if($scope.gameContainer.cellListArray[0].status == "X" && $scope.gameContainer.cellListArray[4].status == "X" && $scope.gameContainer.cellListArray[8].status == "X")
      $scope.gameContainer.p1Wins = true; 
    if($scope.gameContainer.cellListArray[2].status == "X" && $scope.gameContainer.cellListArray[4].status == "X" && $scope.gameContainer.cellListArray[6].status == "X")
      $scope.gameContainer.p1Wins = true; 

// if Y wins
    if($scope.gameContainer.cellListArray[0].status == "O" && $scope.gameContainer.cellListArray[1].status == "O" && $scope.gameContainer.cellListArray[2].status == "O")
      $scope.gameContainer.p2Wins = true;
    if($scope.gameContainer.cellListArray[3].status == "O" && $scope.gameContainer.cellListArray[4].status == "O" && $scope.gameContainer.cellListArray[5].status == "O")
      $scope.gameContainer.p2Wins = true;
    if($scope.gameContainer.cellListArray[6].status == "O" && $scope.gameContainer.cellListArray[7].status == "O" && $scope.gameContainer.cellListArray[8].status == "O")
      $scope.gameContainer.p2Wins = true;
    if($scope.gameContainer.cellListArray[0].status == "O" && $scope.gameContainer.cellListArray[4].status == "O" && $scope.gameContainer.cellListArray[8].status == "O")
      $scope.gameContainer.p2Wins = true; 
    if($scope.gameContainer.cellListArray[2].status == "O" && $scope.gameContainer.cellListArray[4].status == "O" && $scope.gameContainer.cellListArray [6].status == "O")
      $scope.gameContainer.p2Wins = true; 

// if tie
   if ($scope.gameContainer.clickCounter == 9 && $scope.gameContainer.p1Wins == false && $scope.gameContainer.p2Wins == false)
    $scope.gameContainer.pTie = true;

// keep track of how many times player 1 wins
    if($scope.gameContainer.p1Wins == true){
      $scope.gameContainer.p1Counter += 1;
    }

// keep track of how many times player 2 wins    
    if($scope.gameContainer.p2Wins == true){
      $scope.gameContainer.p2Counter += 1;
     }

  } ; // end of playerPics()

  $scope.newGameButton = function (){
// reset the game without reseting the player wins counters
    $scope.gameContainer.clickCounter = 0;
    $scope.gameContainer.p1Wins = false; 
    $scope.gameContainer.p2Wins = false; 
    $scope.gameContainer.pTie = false;

    $scope.gameContainer.cellListArray = [
      {status: "B"}, {status: "B"}, {status: "B"},
      {status: "B"}, {status: "B"}, {status: "B"},
      {status: "B"}, {status: "B"}, {status: "B"}
    ]   
  };

}) ; // end of controller