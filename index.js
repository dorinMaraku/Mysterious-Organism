// Returns a random DNA base
const dnaBases = ["A", "T", "C", "G"];
const returnRandBase = () => {
  return dnaBases[Math.floor(Math.random() * dnaBases.length)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

let num = 0;
class pAequorFactory {
  constructor(specimenNum, dna) {
    this._specimenNum = num++;
    this._dna = mockUpStrand();
  }

  get specimenNum() {
    return this._specimenNum;
  }

  get dna() {
    return this._dna;
  }

  mutate() {
    if (dnaBases.includes(this.dna[0])) {
      const returnRandBase2 = () => {
        const removingIndexedgBase = dnaBases.splice(
          dnaBases.indexOf(this.dna[0]),
          1
        );
        return dnaBases[Math.floor(Math.random() * dnaBases.length)];
      };
      this.dna[0] = returnRandBase2();
      return this.dna;
    }
    return this.dna;
  }

  compareDNA(pAequor) {
    if (this.specimenNum != pAequor.specimenNum) {
      let count = 0;
      const countingMatch = this.dna.map((el, n) => {
        if (this.dna[n] === pAequor.dna[n]) {
          count++;
          return count;
        }
      });
      return `specimen #${this.specimenNum} and specimen #${
        pAequor.specimenNum
      } have ${Math.round((count / this.dna.length) * 100)}% DNA in common`;
    } else {
      return "You are comparing the same beast. Please enter another pAequor!";
    }
  }

  willLikelySurvive() {
    let countCGBases = 0;
    const countingCGMatch = this.dna.forEach((el) => {
      if (el === "C" || el === "G") {
        countCGBases++;
      }
    });
    const result = countCGBases / this.dna.length >= 0.6 ? true : false;
    return result;
  }

  complementStrand() {
    let newStrand = [];
    const iteratingThorughStrand = this.dna.forEach((i) => {
      if (i === "A") {
        return newStrand.push("T");
      } else if (i === "T") {
        return newStrand.push("A");
      } else if (i === "C") {
        return newStrand.push("G");
      } else if (i === "G") {
        return newStrand.push("C");
      } else {
        return "An error has occured. PLease check your strand";
      }
    });
    return newStrand;
  }
}

const createSurvivingpAequors = (num) => {
  let pAequorArray = [];
  while (pAequorArray.length < num) {
    const newpAequor = new pAequorFactory();
    if (newpAequor.willLikelySurvive() === true) {
      pAequorArray.push(newpAequor.dna);
    }
  }
  return pAequorArray;
};

const pAequorCreation = createSurvivingpAequors(3);
console.log(pAequorCreation);

const complementpAequor = new pAequorFactory();

console.log(complementpAequor.specimenNum);
console.log(complementpAequor.dna);
console.log(complementpAequor.complementStrand());
