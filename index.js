let player1WinCount = 0, player2WinCount = 0, drawCount = 0, countSteps = 0;

// all possible winning pattern for specific index 0 - 9
let possibleAnswer = [['0102', '1020', '1122'], ['0002', '1121'], ['0100', '1222', '1120'], ['1112', '0020'], ['1012', '0121', '0022', '1220'], ['0222', '1110'], ['1000', '2122', '1102'], ['2022', '1101'], ['2021', '1202', '1100']];

// to decide the winner
function decideWinner(reference) {
    let element = $(reference);
    let myClassString = element.attr('class');
    let index = myClassString.substring(myClassString.length - 2);
    orgIndex = Number(index[0]) * 3 + Number(index[1]);

    let currPossibleAns = possibleAnswer[orgIndex];

    for(let i = 0; i < currPossibleAns.length; i++) {
        let currAns = currPossibleAns[i];
        let firstBox = currAns[0] + currAns[1];
        let secondBox = currAns[2] + currAns[3];
        if($('.' + firstBox).html() === element.html() && $('.' + secondBox).html() === element.html()) {
            return [index, firstBox, secondBox];
        }
    }
    return false;
}

// for Updating Score
function changeScore(myClass) {
    if(myClass === '.draw .score') {
        $(myClass).html(++drawCount);
    }
    else if($('.' + myClass).html() === 'X') {
        $('.player1 .score').html(++player1WinCount);
    } else {
        $('.player2 .score').html(++player2WinCount);
    }
}

// for Winning Animation
function WinningAnimation(decideWinnerAns) {
    $('.' + decideWinnerAns[0]).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    $('.' + decideWinnerAns[1]).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    $('.' + decideWinnerAns[2]).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
}

// for draw Animation
function drawAinmation() {
    $('.box').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
}

// when the document is ready so that we can manipulate the DOM
$(document).ready(function() {
    let currentPlayer = 'X';
    let currColor = '#FF7B54';
    let canClick = true;

    // to select all box
    $('.box').click(function() {
        // get a reference to the clicked box
        let element = $(this);

        // sequence wise printing of X and Y
        if(element.html() !== 'X' && element.html() !== 'O' && canClick) {
            element.html(currentPlayer);
            element.css('color', currColor);
            if(currentPlayer === 'X') {
                currentPlayer = 'O';
                currColor = '#F7D060';
            } else {
                currentPlayer = 'X';
                currColor = '#FF7B54';
            }
            countSteps++;

            // checking winner
            let decideWinnerAns = decideWinner(this);

            if(decideWinnerAns != false) {
                canClick = false;
                WinningAnimation(decideWinnerAns);
                changeScore(decideWinnerAns[0]);
                setTimeout(refreshGame, 1800);
            } else if(countSteps === 9) {
                canClick = false;
                drawAinmation();
                changeScore('.draw .score');
                setTimeout(refreshGame, 1800);
            }
        }
    });

    // function to refresh the game
    function refreshGame() {
        $('.box').html('');
        currentPlayer = 'X';
        currColor = '#FF7B54';
        canClick = true;
        countSteps = 0;
    }
});


