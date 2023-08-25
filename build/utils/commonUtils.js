"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcTimeToReivew = exports.calculateLevelWord = exports.getHierarchicalArrayOfWords = void 0;
function getHierarchicalArrayOfWords(wordsLearned) {
    let hierarchicalArrayOfWords = [], quantityWordslevel1 = 0, quantityWordslevel2 = 0, quantityWordslevel3 = 0, quantityWordslevel4 = 0;
    if (!!wordsLearned) {
        const hierarchyTable = {
            level1: 0,
            level2: 0.25,
            level3: 0.5,
            level4: 0.75, // On-demand
        };
        wordsLearned.map((item) => {
            const { numberOfReviewCorrect = 0, numberOfReview = 0 } = item;
            const level = numberOfReviewCorrect / numberOfReview;
            if (level >= hierarchyTable.level1 && level < hierarchyTable.level2) {
                quantityWordslevel1 += 1;
            }
            else if (level >= hierarchyTable.level2 &&
                level < hierarchyTable.level3) {
                quantityWordslevel2 += 1;
            }
            else if (level >= hierarchyTable.level3 &&
                level < hierarchyTable.level4) {
                quantityWordslevel3 += 1;
            }
            else if (level >= hierarchyTable.level4) {
                quantityWordslevel4 += 1;
            }
        });
        hierarchicalArrayOfWords = [
            quantityWordslevel1,
            quantityWordslevel2,
            quantityWordslevel3,
            quantityWordslevel4,
        ]; // example: hierarchicalArrayOfWords=[10,13,20,89]
    }
    return hierarchicalArrayOfWords;
}
exports.getHierarchicalArrayOfWords = getHierarchicalArrayOfWords;
function calculateLevelWord(numberOfReviewCorrect, numberOfReview) {
    const hierarchyTable = {
        level1: 0,
        level2: 0.25,
        level3: 0.5,
        level4: 0.75, // On-demand
    };
    const level = numberOfReviewCorrect / numberOfReview;
    if (level >= hierarchyTable.level1 && level < hierarchyTable.level2) {
        return 1;
    }
    else if (level >= hierarchyTable.level2 && level < hierarchyTable.level3) {
        return 2;
    }
    else if (level >= hierarchyTable.level3 && level < hierarchyTable.level4) {
        return 3;
    }
    else {
        return 4;
    }
}
exports.calculateLevelWord = calculateLevelWord;
/**
 * @function `calcTimeToReivew`.
 *  Word will have lastTimeReview. nextTimeReview will base on lastTimeReview plus amount of time corresponding to each level:
 *      with words in level1 review once an hour: ex: lastTimeReview: 2023/05/20 08:30 => nextTimeReview: 2023/05/20 09:30
 *      with words in level2 review once a day
 *      with words in level3 once each two day
 *      with words in level4 once every three days.
 */
function calcTimeToReivew(lastTimeReview, numberOfReviewCorrect, numberOfReview) {
    const levelOfWord = calculateLevelWord(numberOfReviewCorrect, numberOfReview);
    let nextTimeReview = lastTimeReview;
    const ONEHOUR = 60 * 60 * 1000; //  one second = 1000 miliseconds
    if (levelOfWord === 1) {
        return (nextTimeReview = lastTimeReview + ONEHOUR);
    }
    else if (levelOfWord === 2) {
        return (nextTimeReview = lastTimeReview + 24 * ONEHOUR);
    }
    else if (levelOfWord === 3) {
        return (nextTimeReview = lastTimeReview + 2 * 24 * ONEHOUR);
    }
    else {
        return (nextTimeReview = lastTimeReview + 3 * 24 * ONEHOUR);
    }
}
exports.calcTimeToReivew = calcTimeToReivew;
