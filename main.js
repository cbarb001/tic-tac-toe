

var TTTApp = angular.module("TTTApp", ["firebase"]);



TTTApp.controller("TTTController", function ($scope, $firebase) {


  $scope.remoteGameContainer = $firebase(new Firebase("https://cosimottt.firebaseIO.com/databaseGameContainer")) ;
  
  $scope.x0 = false;
  $scope.x1 = false; 
  $scope.x2 = false;
  $scope.x3 = false;
  $scope.x4 = false;
  $scope.x5 = false;
  $scope.x6 = false;
  $scope.x7 = false;
  $scope.x8 = false;

  $scope.o0 = false;
  $scope.o1 = false;
  $scope.o2 = false;
  $scope.o3 = false;
  $scope.o4 = false;
  $scope.o5 = false;
  $scope.o6 = false;
  $scope.o7 = false;
  $scope.o8 = false;

  $scope.movecounter = 0;
  $scope.xWins = false;
  $scope.oWins = false;
  $scope.tie = false;
  $scope.xWinsCounter = 0;
  $scope.oWinsCounter = 0;

  $scope.cellList = [
  
	{status: "B", pos: 0}, {status: "B", pos: 1}, {status: "B", pos: 2},
	{status: "B", pos: 3}, {status: "B", pos: 4}, {status: "B", pos: 5},
	{status: "B", pos: 6}, {status: "B", pos: 7}, {status: "B", pos: 8}
  ]  ;


 // This container object is what gets synced:
  $scope.gameContainer = {
    cellListArray: $scope.cellList,
    clickCounter: $scope.movecounter,
    p1Wins: $scope.xWins,
    p2Wins: $scope.oWins,
    pTie: $scope.tie,
    p1Counter: $scope.xWinsCounter,
    p2Counter: $scope.oWinsCounter,

    p10: $scope.x0,
    p11: $scope.x1, 
    p12: $scope.x2,
    p13: $scope.x3, 
    p14: $scope.x4,
    p15: $scope.x5, 
    p16: $scope.x6,
    p17: $scope.x7,
    p18: $scope.x8,

    p20: $scope.o0, 
    p21: $scope.o1,
    p22: $scope.o2,
    p23: $scope.o3,
    p24: $scope.o4,
    p25: $scope.o5,
    p26: $scope.o6,
    p27: $scope.o7,
    p28: $scope.o8

  };


  // Everywhere else in your program, use $scope.gameContainer.cellListArray instead of cellList.
  // Everywhere else in your program, use $scope.gameContainer.clickCounter instead of clickCount.
  // Make that change in your ng-repeat as well and anywhere in your index.html as needed.


  // remoteGameContainer: that is the name you gave the Firebase collection (looks like a folder in Firebase).
  // The bind statement creates a connection between anything in your app and the Firebase connection we just created.
   
  $scope.remoteGameContainer.$bind($scope, "gameContainer") ;

 // The bind statement will automatically update your model, in this case cellList, whenever it 
  // changes on Firebase.  But this will not trigger an Angular update of the interface (index.html)
  // - we've been relying on the ng-click to wake up Angular and get the gameboard refreshed.
  // So we put a watch on cellList - this tells Angular to refresh the interface elements, ie ng-class,
  // whenever the model, in this case celList, changes.
 
  $scope.$watch('gameContainer', function() {
    console.log('gameCountainer changed!') ;
  }) ;



  $scope.playerPicks = function(thisCell) {

    
    console.log("Cell " + thisCell.pos + " was: " + thisCell.status) ;
    if (($scope.gameContainer.clickCounter % 2) == 1 && thisCell.status == "B") {
        thisCell.status = "X" ;  // changes cell status to x
	      $scope.gameContainer.clickCounter = $scope.gameContainer.clickCounter + 1 ;
      } 
	if (($scope.gameContainer.clickCounter % 2) == 0 && thisCell.status == "B") {
      thisCell.status = "O" ; //changes cell status to o
	  $scope.gameContainer.clickCounter = $scope.gameContainer.clickCounter + 1 ;
    } 
    console.log("Cell " + thisCell.pos + " is now: " + thisCell.status) ;

  //Keeps track of wheter a cell is makred as x or o

   if(thisCell.status == "X" && thisCell.pos == 0)
   	$scope.gameContainer.p10 = true;
   if(thisCell.status == "X" && thisCell.pos == 1)
   	$scope.gameContainer.p11 = true;
   if(thisCell.status == "X" && thisCell.pos == 2)
   	$scope.gameContainer.p12 = true;
   if(thisCell.status == "X" && thisCell.pos == 3)  
   	$scope.gameContainer.p13 = true;
   if(thisCell.status == "X" && thisCell.pos == 4)
   	$scope.gameContainer.p14 = true
   if(thisCell.status == "X" && thisCell.pos == 5)
   	$scope.gameContainer.p15 = true;
   if(thisCell.status == "X" && thisCell.pos == 6)
   	$scope.gameContainer.p16 = true;
   if(thisCell.status == "X" && thisCell.pos == 7)
   	$scope.gameContainer.p17= true;
   if(thisCell.status == "X" && thisCell.pos == 8)
   	$scope.gameContainer.p18 = true;


   if(thisCell.status == "O" && thisCell.pos == 0)
   	$scope.gameContainer.p20 = true;
   if(thisCell.status == "O" && thisCell.pos == 1)  
   	$scope.gameContainer.p21 = true;
   if(thisCell.status == "O" && thisCell.pos == 2)
   	$scope.gameContainer.p22 = true;
   if(thisCell.status == "O" && thisCell.pos == 3)
   	$scope.gameContainer.p23 = true;
   if(thisCell.status == "O" && thisCell.pos == 4)
   	$scope.gameContainer.p24 = true
   if(thisCell.status == "O" && thisCell.pos == 5)
   	$scope.gameContainer.p25 = true;
   if(thisCell.status == "O" && thisCell.pos == 6)
   	$scope.gameContainer.p26 = true;
   if(thisCell.status == "O" && thisCell.pos == 7)
   	$scope.gameContainer.p27 = true;
   if(thisCell.status == "O" && thisCell.pos == 8)
   	$scope.gameContainer.p28= true;
   
   
// if X wins
   if($scope.gameContainer.p10 == true && $scope.gameContainer.p11 == true && $scope.gameContainer.p12 == true)
   	$scope.gameContainer.p1Wins = true;
   if($scope.gameContainer.p13 == true && $scope.gameContainer.p14 == true && $scope.gameContainer.p15 == true)
   	$scope.gameContainer.p1Wins = true;
   if($scope.gameContainer.p16 == true && $scope.gameContainer.p17 == true && $scope.gameContainer.p18 == true)
   	$scope.gameContainer.p1Wins = true;

  if($scope.gameContainer.p10 == true && $scope.gameContainer.p13 == true && $scope.gameContainer.p16 == true)
   	$scope.gameContainer.p1Wins = true;
  if($scope.gameContainer.p11 == true && $scope.gameContainer.p14 == true && $scope.gameContainer.p17 == true)
   	$scope.gameContainer.p1Wins = true;
  if($scope.gameContainer.p12 == true && $scope.gameContainer.p15 == true && $scope.gameContainer.p18 == true)
	$scope.gameContainer.p1Wins = true;
  if($scope.gameContainer.p10 == true && $scope.gameContainer.p14 == true && $scope.gameContainer.p18 == true)
   	$scope.gameContainer.p1Wins = true;
   if($scope.gameContainer.p12 == true && $scope.gameContainer.p14 == true && $scope.gameContainer.p16 == true)
   	$scope.gameContainer.p1Wins = true;

//if Y wins
    if($scope.gameContainer.p20 == true && $scope.gameContainer.p21 == true && $scope.gameContainer.p22 == true)
   	$scope.gameContainer.p2Wins = true;
   if($scope.gameContainer.p23 == true && $scope.gameContainer.p24 == true && $scope.gameContainer.p25 == true)
   	$scope.gameContainer.p2Wins = true;
   if($scope.gameContainer.p26 == true && $scope.gameContainer.p27 == true && $scope.gameContainer.p28 == true)
   	$scope.gameContainer.p2Wins = true;

  if($scope.gameContainer.p20 == true && $scope.gameContainer.p23 == true && $scope.gameContainer.p26 == true)
   	$scope.gameContainer.p2Wins = true;
   if($scope.gameContainer.p21 == true && $scope.gameContainer.p24 == true && $scope.gameContainer.p27 == true)
   	$scope.gameContainer.p2Wins = true;
   if($scope.gameContainer.p22 == true && $scope.gameContainer.p25 == true && $scope.gameContainer.p28 == true)
   	$scope.gameContainer.p2Wins = true;

   if($scope.gameContainer.p20 == true && $scope.gameContainer.p24 == true && $scope.gameContainer.p28 == true)
   	$scope.gameContainer.p2Wins = true;
   if($scope.gameContainer.p22 == true && $scope.gameContainer.p24 == true && $scope.gameContainer.p26 == true)
   	$scope.gameContainer.p2Wins = true;


   //if tie
   if ($scope.gameContainer.clickCounter == 9 && $scope.gameContainer.p1Wins == false && $scope.gameContainer.p2Wins == false)
    $scope.gameContainer.pTie = true;

    //keep track of how many times player 1 wins and player 2 wins

    if($scope.gameContainer.p1Wins==true)
      $scope.gameContainer.p1Counter += 1;
    if($scope.gameContainer.p2Wins==true)
      $scope.gameContainer.p2Counter += 1;

    

  } ; //playerPics()

  $scope.newGameButton = function (){
    $scope.gameContainer.clickCounter = 0;
    $scope.gameContainer.p1Wins = false;
    $scope.gameContainer.p2Wins = false;
    $scope.gameContainer.pTie = false;

    $scope.gameContainer.p10 = false;  
    $scope.gameContainer.p11 = false;
    $scope.gameContainer.p12 = false;
    $scope.gameContainer.p13 = false;
    $scope.gameContainer.p14 = false;
    $scope.gameContainer.p15 = false;
    $scope.gameContainer.p16 = false;
    $scope.gameContainer.p17 = false;
    $scope.gameContainer.p18 = false;

    $scope.gameContainer.p20 = false;
    $scope.gameContainer.p21 = false;
    $scope.gameContainer.p22 = false;
    $scope.gameContainer.p23 = false;
    $scope.gameContainer.p24 = false;
    $scope.gameContainer.p25 = false;
    $scope.gameContainer.p26 = false;
    $scope.gameContainer.p27 = false;
    $scope.gameContainer.p28 = false;

    $scope.gameContainer.cellListArray = [
  
  {status: "B", pos: 0}, {status: "B", pos: 1}, {status: "B", pos: 2},
  {status: "B", pos: 3}, {status: "B", pos: 4}, {status: "B", pos: 5},
  {status: "B", pos: 6}, {status: "B", pos: 7}, {status: "B", pos: 8}
  ]  
    
  };

  
 

}) ; // end of controller