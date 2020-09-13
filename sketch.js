
let numIterations = 12;
let rotateAngle = 2 * 3.141592 / 7;
let shorteningFactor = 0.6;
let widthFactor = 0.7;
let initialLineLength = 200;
let initialWidth = 20;

let current_iteration_number = 0;
let l_system_string = '';
let grow = false;

let numIterationSlider;
let rotateAngleSlider;
let shorteningFactorSlider;
let widthFactorSlider;
let initialLineLengthSlider;
let initialWidthSlider;

let growCheckbox;

function setup() {
    createCanvas(800, 600);
    frameRate(15);

    numIterationSlider = createLabelledSlider('Num iterations', 1, 14, 12, 1);
    rotateAngleSlider = createLabelledSlider('Rotate angle', 0, PI, 2 * PI / 7, 0);
    shorteningFactorSlider = createLabelledSlider('Shortening factor', 0, 1, 0.6, 0);
    widthFactorSlider = createLabelledSlider('Width factor', 0, 1.3, 0.7, 0);
    initialLineLengthSlider = createLabelledSlider('Initial line length', 0, 400, 200, 1);
    initialWidthSlider = createLabelledSlider('Initial width', 1, 60, 20, 1);

    growCheckbox = createCheckbox('Grow', false);
}

function createLabelledSlider(labelText, min, max, value, step) {
    const group = createDiv('');
    const label = createSpan(labelText);
    label.parent(group);
    const slider = createSlider(min, max, value, step);
    slider.parent(group);
    return slider;
}

function draw() {
    const newNumIterations = numIterationSlider.value();
    const newRotateAngle = rotateAngleSlider.value();
    const newShorteningFactor = shorteningFactorSlider.value();
    const newWidthFactor = widthFactorSlider.value();
    const newInitialLineLength = initialLineLengthSlider.value();
    const newInitialWidth = initialWidthSlider.value();
    const newGrow = growCheckbox.checked();

    if (numIterations !== newNumIterations ||
        rotateAngle !== newRotateAngle ||
        shorteningFactor !== newShorteningFactor ||
        widthFactor !== newWidthFactor ||
        initialLineLength !== newInitialLineLength ||
        initialWidth !== newInitialWidth ||
        grow !== newGrow
    ) {
        // Reset drawing
        numIterations = newNumIterations;
        rotateAngle = newRotateAngle;
        shorteningFactor = newShorteningFactor;
        widthFactor = newWidthFactor;
        initialLineLength = newInitialLineLength;
        initialWidth = newInitialWidth;
        grow = newGrow;

        current_iteration_number = 0;
        l_system_string = `B(${initialLineLength}, ${initialWidth})`;
        background(51);
        stroke(150);
    }

    if (current_iteration_number < numIterations) {
        if (grow) {
            // Iterate drawing
            l_system_string = iterate_l_system(l_system_string);
            current_iteration_number += 1;
            translate(width / 2, height);
            draw_l_system(l_system_string);
        }
        else {
            // Render whole drawing
            for (let i = 0; i < numIterations; i++) {
                l_system_string = iterate_l_system(l_system_string);
                current_iteration_number += 1;
            }
            translate(width / 2, height);
            draw_l_system(l_system_string);
        }
    }
}

function iterate_l_system(input) {
    return input.replace(/B\(([+-]?\d+(?:\.\d+)?), ([+-]?\d+(?:\.\d+)?)\)/g, (match, length, width) => {
        const newLength = length * shorteningFactor;
        const newWidth = width * widthFactor;
        const newBranch = `B(${newLength}, ${newWidth})`;
        return `L(${length}, ${width})[R(${rotateAngle})${newBranch}][R(${-rotateAngle})${newBranch}]`
    });
}

function draw_l_system(input) {
    while (input.length > 0) {
        if (input.charAt(0) === '[') {
            input = input.substring(1);
            push();
        }
        else if (input.charAt(0) === ']') {
            input = input.substring(1);
            pop();
        }
        else if (input.charAt(0) === 'R') {
            input = input.replace(/R\(([+-]?\d+(?:\.\d+))\)/, (match, angle) => {
                rotate(angle);
                return '';
            });
        }
        else if(input.charAt(0) === 'L') {
            input = input.replace(/L\(([+-]?\d+(?:\.\d+)?), ([+-]?\d+(?:\.\d+)?)\)/, (match, length, width) => {
                strokeWeight(width);
                line(0, 0, 0, -length);
                translate(0, -length);
                return '';
            });
        }
        else if(input.charAt(0) === 'B') {
            input = input.replace(/B\(([+-]?\d+(?:\.\d+)?), ([+-]?\d+(?:\.\d+)?)\)/, (match, length, width) => {
                return '';
            });
        }
        else {
            console.error('Unrecognised character: ' + input[0]);
            console.error(input);
            return
        }
    }
}
