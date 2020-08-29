
let numIterations = 10;
let rotateAngle = 2 * 3.141592 / 7;
let shorteningFactor = 0.6;
let widthFactor = 0.7;
let initialLineLength = 200;
let initialWidth = 20;

let numIterationSlider;
let rotateAngleSlider;
let shorteningFactorSlider;
let widthFactorSlider;
let initialLineLengthSlider;
let initialWidthSlider;

function setup() {
    createCanvas(800, 600);

    numIterationSlider = createLabelledSlider('Num iterations', 1, 14, 10, 1);
    rotateAngleSlider = createLabelledSlider('Rotate angle', 0, PI, 2 * PI / 7, 0);
    shorteningFactorSlider = createLabelledSlider('Shortening factor', 0, 1, 0.6, 0);
    widthFactorSlider = createLabelledSlider('Width factor', 0, 1.3, 0.7, 0);
    initialLineLengthSlider = createLabelledSlider('Initial line length', 0, 400, 200, 1);
    initialWidthSlider = createLabelledSlider('Initial width', 1, 60, 20, 1);
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
    numIterations = numIterationSlider.value();
    rotateAngle = rotateAngleSlider.value();
    shorteningFactor = shorteningFactorSlider.value();
    widthFactor = widthFactorSlider.value();
    initialLineLength = initialLineLengthSlider.value();
    initialWidth = initialWidthSlider.value();

    background(51);
    stroke(150);
    translate(width / 2, height);
    drawBranch(initialLineLength, initialWidth, numIterations)
}

function drawBranch(length, width, iterations) {
    if (iterations < 1) {
        return;
    }
    strokeWeight(width);
    line(0, 0, 0, -length);
    translate(0, -length);
    push();
    rotate(rotateAngle);
    drawBranch(length * shorteningFactor, width * widthFactor, iterations - 1);
    pop();
    push();
    rotate(-rotateAngle);
    drawBranch(length * shorteningFactor, width * widthFactor, iterations - 1);
    pop();
}
