"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHierarchicalArrayOfWords = void 0;
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
