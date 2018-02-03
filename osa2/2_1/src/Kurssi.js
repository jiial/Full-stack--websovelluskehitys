import React from 'react';

const Kurssi = (props) => {
    const rivit = props.kurssi.osat.map(osa => <Sisalto key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)
    const summa = props.kurssi.osat.reduce(function (sum, osa) {
        return sum + osa.tehtavia
    }, 0)
    return (
        <div>
            <Otsikko kurssi={props.kurssi.nimi} />
            {rivit}
            <Yhteensa yht={summa} />
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osa} {props.tehtavia}</p>
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.nimi} tehtavia={props.tehtavia} />
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.yht} tehtävää</p>
    )
}

export default Kurssi