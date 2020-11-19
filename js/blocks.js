// Defines the custom blocks used in our toolbox.

Blockly.defineBlocksWithJsonArray([
    // Start
    {
        "type": "custom_start",
        "message0": "When %1 pressed, robot does this:",
        "args0": [
          {
            "type": "field_image",
            "src": "https://github.com/vcuse/robots/blob/master/img/hand.png?raw=true", //change to own image
            "width": 25,
            "height": 25,
            "alt": "play button",
            "flipRtl": false
          }
        ],
        "nextStatement": null,
        "colour": 15,
        "tooltip": "",
        "helpUrl": ""
    },
    // Move somewhere
    {
        "type": "custom_move",
        "message0": "Move arm %1 to %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SPEED",
                "options": [
                [
                    "quickly",
                    "QUICK"
                ],
                [
                    "moderately",
                    "MODERATE"
                ],
                [
                    "slowly",
                    "SLOW"
                ]
                ]
            },
            {
                "type": "field_variable",
                "name": "LOCATION",
                "variable": "[location]"
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 50,
        "tooltip": "",
        "helpUrl": "",
        "mutator": "move_mutator"
    },
    // Follow movement
    {
        "type": "custom_follow",
        "message0": "Follow other arm",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 50,
        "tooltip": "",
        "helpUrl": ""
    },
    // Mirror movement
    {
        "type": "custom_mirror",
        "message0": "Mirror other arm",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 50,
        "tooltip": "",
        "helpUrl": ""
    },
    // Open hand
    {
        "type": "custom_open",
        "message0": "Open hand",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },
    // Close hand
    {
        "type": "custom_close",
        "message0": "Close hand",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },
    // Wait for the other
    {
        "type": "custom_wait",
        "message0": "Wait for each other",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#888",
        "tooltip": "",
        "helpUrl": ""
    }
]);


// Controls whether move blocks have a value input at the end.

var moveMixin = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var type = this.getField('END') ? this.getFieldValue('END') : 'null';
        container.setAttribute('type', type);
        return container;
    },

    domToMutation: function(xmlElement) {
        var type = xmlElement.getAttribute('type');
        this.updateShape_(type);
    },

    updateShape_: function(type) {
        var speed = new Blockly.FieldDropdown([["quickly","QUICK"], ["moderately","MODERATE"], ["slowly","SLOW"]]);
        var location = new Blockly.FieldVariable("[location]");

        if (type == 'null' && this.getField('END')) {
            this.getInput('').removeField('END');
        } else if (type != 'null') {
            this.getInput('').removeField('END', true);
            this.getInput('').appendField(type, 'END');
        }
    }
}

Blockly.Extensions.registerMutator("move_mutator", moveMixin);