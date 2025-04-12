const simpleWords = [
    // Actions (Verbs)
    "run", "walk", "jump", "play", "eat", "go", "sit", "stand", "write", "read",
    "talk", "sleep", "cook", "draw", "smile", "think", "cry", "drink", "swim", "ride",
  
    // Prepositions
    "in", "on", "under", "over", "between", "beside", "with", "without", "by", "near",
    "from", "to", "into", "onto", "around", "through",
  
    // Nouns
    "dog", "cat", "ball", "book", "pen", "car", "tree", "boy", "girl", "house",
    "chair", "table", "door", "road", "water", "food", "school", "sun", "moon", "bed",
  
    // Adjectives
    "big", "small", "fast", "slow", "happy", "sad", "hot", "cold", "soft", "hard",
  
    // Conjunctions / Fillers
    "and", "but", "or", "so", "then", "yet", "when", "while", "if", "because"
  ];


function sentenceGenerator(){
    let lst = []
    for (let i = 0; i < 35; i++){
        const randomNumber = Math.floor(Math.random() * simpleWords.length) + 1;
        lst.push(simpleWords[randomNumber]);
    }
    return lst;
}
export const sentence = (sentenceGenerator()).join(' ');
