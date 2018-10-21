var Stored_Results;

function processData(input)
{
    var Index = 0;
    var Lines = input.trim().split("\n");
    var Test_Count = parseInt(Lines[Index++].trim());
    for (var t = 0; t < Test_Count; t++)
    {
        Stored_Results = {};
        var Sequence_Length = parseInt(Lines[Index++].trim(), 10);
        var Sequence = Lines[Index++].trim().split(" ");
        Sequence = Sequence.map(Number);
        
        var Winner = determineWinner(Sequence, true);
        console.log(Winner);
    }
}

function determineWinner(Sequence, Is_Alices_Turn)
{
    var Current_Player = (Is_Alices_Turn) ? "Alice" : "Bob";
    var Next_Player = (Is_Alices_Turn) ? "Bob" : "Alice";
    
    // First check if we've already tested this sequence before
    if (Sequence in Stored_Results)
    {
        var Win_For_Current_Player = Stored_Results[Sequence];
        return (Win_For_Current_Player) ? Current_Player : Next_Player;
    }
    
    for (var Ignored_Index = 0; Ignored_Index < Sequence.length; Ignored_Index++)
    {
        var Is_Increasing = true;
        var i = 0;
        while (Is_Increasing && (i < Sequence.length - 1))
        {
            if (i == Ignored_Index)
                i++;
            
            var j = i + 1;
            if (j == Ignored_Index)
                j++;
            
            if (Sequence[i] > Sequence[j])
                Is_Increasing = false;
            i++;
        }
        
        if (Is_Increasing)
        {
            Stored_Results[Sequence] = true;
            return Current_Player;
        }
    }
    for (var i = 0; i < Sequence.length; i++)
    {
        var NewSequence = Sequence.slice();
        NewSequence.splice(i, 1);
        var Prospective_Winner = determineWinner(NewSequence, !Is_Alices_Turn);
        if (Prospective_Winner == Current_Player)
        {
            Stored_Results[Sequence] = true;
            return Current_Player;
        }
    }
    Stored_Results[Sequence] = false;
    return Next_Player;
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});