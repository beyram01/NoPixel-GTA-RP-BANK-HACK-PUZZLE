import _ from "lodash";

const COLORS = ["white", "black", "green", "blue", "red", "yellow", "purple"];
const SHAPES = ["triangle", "rectangle", "circle", "square"];
const QUESTIONS = [
  "background color",
  "number color",
  "shape",
  "shape color",
  "color text",
  "text background color",
  "shape text",
];

class Game {
  rounds = JSON.parse(localStorage.getItem("puzzle_settings")).numberOfRounds;
  puzzleAmount = JSON.parse(localStorage.getItem("puzzle_settings"))
    .puzzleAmount;
  puzzleData = [];
  constructor() {
    this.gatherRoundData();
  }

  gatherRoundData() {
    while (this.puzzleData.length < this.rounds) {
      let roundKey = `${this.puzzleData.length + 1}`;
      const numbers = this.generateNumbers();
      const data = this.generatePuzzle(numbers);
      const questions = this.generateQuestions();
      const answers = this.generateAnswers(questions, data);
      const finalData = { round: roundKey, numbers, data, questions, answers };
      this.puzzleData.push(finalData);
    }
  }

  /**
   * Recursive function to make sure that we push unique values to the given array.
   * @param {Array} array where we will check if the number exists or not
   * @param {Function} cb callback function to push the unique number to the array if it's unique
   */
  getUniqueNumber(array, cb) {
    const num = _.random(1, this.puzzleAmount);
    if (_.indexOf(array, num) === -1) {
      return cb(num);
    }
    this.getUniqueNumber(array, cb);
  }

  /**
   * generate dynamique and unique sets of numbers for each round.
   * @returns return an Array of the generated numbers
   */
  generateNumbers() {
    // generate rounds numbers
    let numbers = [];
    for (let i = 0; i < this.puzzleAmount; i++) {
      this.getUniqueNumber(numbers, (num) => numbers.push(num));
    }

    return numbers;
  }

  randomColor(colors) {
    return colors[_.random(0, colors.length - 1)];
  }

  randomShape() {
    return SHAPES[_.random(0, SHAPES.length - 1)];
  }

  setPuzzelData(id) {
    let shapeColor = this.randomColor(COLORS);
    const noShapeColor = COLORS.filter((c) => c !== shapeColor);
    let backgroundColor = this.randomColor(noShapeColor);
    let textColor = this.randomColor(noShapeColor);
    let numberColor = this.randomColor(noShapeColor);
    let textUp = this.randomColor(COLORS);
    let textDown = this.randomShape();
    let number = _.random(0, 9);
    let shape = this.randomShape();

    return {
      id,
      shapeColor,
      backgroundColor,
      textColor,
      numberColor,
      textUp,
      textDown,
      number,
      shape,
    };
  }

  generatePuzzle(numbers) {
    // generate puzzle
    // textUp: always colors
    // textDown: always shapes
    // shape color != text color
    // shape color != number color
    // shape color != background color
    let result = [];
    for (let i = 0; i < this.puzzleAmount; i++) {
      result.push(this.setPuzzelData(numbers[i]));
    }
    return result;
  }

  uniqueQuestion(array, cb) {
    const randomQuestion = QUESTIONS[_.random(0, QUESTIONS.length - 1)];
    if (randomQuestion !== array[0]?.qt) {
      cb(randomQuestion);
      return;
    }
    this.uniqueQuestion(array, cb);
  }

  generateQuestions() {
    let questions = [];
    let cards = [];
    for (let j = 0; j < 2; j++) {
      this.getUniqueNumber(cards, (num) => cards.push(num));
      this.uniqueQuestion(questions, (randomQuestion) =>
        questions.push({
          card: cards[j],
          qt: randomQuestion,
        })
      );
    }
    return questions;
  }

  generateAnswers(questions, data) {
    let possibilities = {
      "background color": "backgroundColor",
      "number color": "numberColor",
      shape: "shape",
      "shape color": "shapeColor",
      "color text": "textUp",
      "text background color": "textColor",
      "shape text": "textDown",
    };
    let answers = [];
    questions.forEach((question) => {
      const correctAnswer = data.filter((prop) => prop.id === question.card)[0][
        possibilities[question.qt]
      ];
      answers.push({ card: question.card, answer: correctAnswer });
    });
    return answers;
  }
}

export default Game;
