/**
 * @param description: Description of the state machine.
 * @param element: DOM element to attach the state machine to.
 * @constructor
 */
function StateMachine(description, element) {
    //The table that describes the state machine.
    this.stateTable = description.states;

    //The current state of the state machine.
    this.currentState = description.states[0];

    // The element to which this state machine is attached.
    this.attachedElement = element;
    element.stateMachine = this;

    // Available state machine input events.
    var inputEvents = [
        "click",
        "mouseover", 
        "mouseout",
        "mousedown",
        "mouseup",
        "mousemove"
    ]
    var i;
    for (i = 0; i < inputEvents.length; i++) {
        element.addEventListener(inputEvents[i], this.updateState)
    }

    // Sets up response to key press.
    var self = this;
    document.body.addEventListener("keydown", function(e){
        self.updateState(e);
    });

    // Sets up response to timer which goes off every 30 milliseconds.
    window.setInterval(function(){
        self.updateState({type:"timer", time: performance.now(), target: element});        
    },30);
}

/**
 * Updates the current state given an event input, using the state machine table.
 * @param e: The input event that just happened.
 */
StateMachine.prototype.updateState = function (e) { 
    var sm = this && this.stateTable ? this : this.stateMachine;
    var smTable = sm.stateTable;
    var transitions = sm.currentState.transitions;

    var i, j, t;
    for (i = 0; i < transitions.length; i++) {
        t = transitions[i];
        if (sm.match(t.input, e.type)) {
            // perform action
            t.action(e, sm.attachedElement);
            // update state
            for (j = 0; j < smTable.length; j++) {
                if (smTable[j].name === t.endState) {
                    sm.currentState = smTable[j];
                }
            }
        }
    }
}

/**
 * @param {string} transition_event: The input type of the transition. 
 * @param {string} system_event: The input type of the system event.
 * @return {boolean} Whether the system and transition input events match.
 */
StateMachine.prototype.match = function (transition_event, system_event) {
    switch (system_event) {
        case "click":
            if (transition_event === "click") {return true;}
            break;
        case "mouseover":
            if (transition_event === "mouseIn") {return true;}
            break;
        case "mouseout":
            if (transition_event === "mouseOut") {return true;}
            break;
        case "mousedown":
            if (transition_event === "mouseDown") {return true;}
            break;
        case "mouseup":
            if (transition_event === "mouseUp") {return true;}
            break;
        case "mousemove":
            if (transition_event === "mouseMove") {return true;}
            break;
        case "timer":
            if (transition_event === "timerTick30Ms") {return true;}
            break;
        case "keydown":
            if (transition_event === "keyPress") {return true;}
            break;
    }
    return false;
}
