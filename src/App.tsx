import styles from "./App.module.css";
import powerImg from "./assets/powered.png";
import { useState } from "react";
import { levels, calculateImc, level } from "./helpers/imc";
import { GridItem } from "./components/GridItem";
import leftArrowImage from "./assets/leftarrow.png";

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToshow] = useState<level | null>(null);

  const handleCalculatorButton = () => {
    if( heightField && weightField){
      setToshow(calculateImc(heightField, weightField));
    }else{
      alert("Digite todos os campos.")
    }
  }

  const handleBackButton = () => {
    setToshow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powerImg} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
            <h1>Calcule o seu IMC.</h1>
            <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

            <input 
              type="number" 
              placeholder="Digite a sua altura. Ex: 1.5 (em métros)"
              value={ heightField > 0 ? heightField : '' }
              onChange={ e => setHeightField(parseFloat(e.target.value)) }
              disabled={toShow ? true : false}
            />

            <input 
              type="number" 
              placeholder="Digite o seu peso. Ex: 75.3 (em KG)"
              value={ weightField > 0 ? weightField : '' }
              onChange={ e => setWeightField(parseFloat(e.target.value)) }
              disabled={toShow ? true : false}
            />

            <button disabled={toShow ? true : false} onClick={ handleCalculatorButton }>Calcular</button>
        </div>
        <div className={styles.rigthSide}>
            { !toShow && 
              <div className={styles.grid}>
                {levels.map((item, key) => (
                  <GridItem key={key} item={item} />
                ))}
              </div>
            }
            { toShow && 
              <div className={ styles.rightBig }>
                <div className={ styles.rightArrow } onClick={ handleBackButton }>
                  <img src={ leftArrowImage } alt="" width={ 25 } />
                </div>
                <GridItem item={ toShow }/>
              </div>
            }
        </div>
      </div>
    </div>
  );
}

export default App;