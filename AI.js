
function sortOnFitness(a,b) {
    if(a.fitness == b.fitness) return 0;
    return (a.fitness < b.fitness)? -1: 1;
}

function AI () {
    this.populationSize = 200;
    this.generations = 100;
    this.totalMoves = 1000;
    this.mutationRate = 1.0;
    this.survivalRate = 0.3;
    this.randomSelectionRate = 0.1;
    this.population = [];
    this.fitnessScores = [];
    this.deadCount = 0;
    this.doneCount = 0;

    this.initializePopulation = function() {
        for(var i =0 ; i < this.populationSize;i++){
            var individual = new Player(10, canvas.height / 2, 20, 20);
            individual.randomizeMoves(this.totalMoves);
            individual.moves = individual.unitMoves.map(function(item){
                var temp = []
                for(var i = 0 ;i < 6;i++)
                    temp.push(item);
                return temp;
            }).reduce(function(a,b) {
                return a.concat(b);
            })
            this.population.push(individual);
        }
     }

    //  this.calculateFitnessScores = function() {
    //      for(var i =0;i < this.populationSize;i++){
    //          this.fitnessScores.push([i,this.population[i]]);
    //      }
    //  }

    this.selection = function() {
        var populationCopy = []
        for(var i = 0 ; i <this.populationSize;i++)
            populationCopy.push(this.population[i])

        populationCopy.sort(sortOnFitness);
    
        var numberOfSurvivors = Math.floor(this.survivalRate * this.populationSize);

        this.population = [];
        for(var i = 0;i < numberOfSurvivors;i++)
        this.population.push(populationCopy[i]);
    
        for(var i = numberOfSurvivors; i < this.populationSize;i++)
        if(this.randomSelectionRate >= Math.random())
            this.population.push(populationCopy[i]);
        
        console.log("After selection");
        console.log(this.population.length);

    }
    this.getGenePartition = function() {
        do {
            var a = Math.floor(Math.random() * this.totalMoves);
            var b = Math.floor(Math.random() * this.totalMoves);
        }while(a > b);
        return [a,b];
    }

    this.crossover = function() {
        var numberOfSurvivors = Math.floor(this.survivalRate * this.populationSize);
        var numberOfChildren = this.populationSize - numberOfSurvivors;
        
        var i = 0;
        while(i < numberOfChildren) {
            var fatherIndex = Math.floor(Math.random() * numberOfSurvivors);
            var motherIndex = Math.floor(Math.random() * numberOfSurvivors);
            var father = this.population[fatherIndex];
            var mother = this.population[motherIndex];
            var childA = new Player(10, canvas.height / 2, 20, 20);
            var childB = new Player(10, canvas.height / 2, 20, 20);
            var genePartition = this.getGenePartition();

            for(var j = 0;j < genePartition[0]; j++) {
                childA.unitMoves.push(father.unitMoves[j]);
                childB.unitMoves.push(mother.unitMoves[j]);
            }
            for(var j = genePartition[0];j < genePartition[1]; j++) {
                childA.unitMoves.push(mother.unitMoves[j]);
                childB.unitMoves.push(father.unitMoves[j]);
            }
            for(var j = genePartition[1];j < this.totalMoves; j++) {
                childA.unitMoves.push(father.unitMoves[j]);
                childB.unitMoves.push(mother.unitMoves[j]);
            }

            this.population.push(childA);
            i++;
            
            this.population.push(childB);
                i++;
            

        }
        this.population = this.population.slice(0, this.populationSize);
    }

    this.getRandomGeneIndices = function() {
        var randomIndices = [];
        var n = Math.floor(Math.random())*(1000 - 100) + 100 ;
        for(var i =0;i <n;i++){
            var randomIndex = Math.floor(Math.random()*totalMoves);
            randomIndices.push(randomIndex);
        }
        return randomIndices;
    }

    this.mutation = function() {
        this.population.forEach(function(individual) {
            if(this.mutationRate >= Math.random()) {
                var randomGeneIndices = getRandomGeneIndices(); 
                for(var i =0; i < randomGeneIndices.length;i++)
                    individual.unitMoves[randomGeneIndices[i]] = individual.getRandomDirection();
            }
        })
    }

    this.resetPopulationPositions = function() {
        this.population.forEach(function(individual) {
            individual.x = 10;
            individual.y = canvas.height / 2;
            individual.dead  = false;
            individual.done = false;
            individual.moves = individual.unitMoves.map(function(item){
                var temp = []
                for(var i = 0 ;i < 6;i++)
                    temp.push(item);
                return temp;
            }).reduce(function(a,b) {
                return a.concat(b);
            })

        })
    }

     this.getLatestMove = function() {
         var latestMove = -1;
         this.population.forEach(function(individual){
             if(individual.moveCount > latestMove)
                latestMove = individual.moveCount;
         })

         return latestMove;
     }

     this.isGenerationOver = function() {
        var latestMove = this.getLatestMove();
        return ((this.deadCount + this.doneCount) == this.populationSize) || (latestMove == this.totalMoves * 6);

     }
     this.findBestFitness = function() {

        var bestFitness = 9999;
        this.population.forEach(function(individual) {
            if(individual.fitness < bestFitness) {
                bestFitness = individual.fitness;
            }
        })
        return bestFitness;
     }
    

    }
