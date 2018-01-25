import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
        const palautetta = false
    }

    annaPalaute = (palaute) => {
        if (palaute === "hyva") {
            return () => {
                this.setState({ hyva: this.state.hyva + 1 })
            }
        }
        if (palaute === "huono") {
            return () => {
                this.setState({ huono: this.state.huono + 1 })
            }
        }
        if (palaute === "neutraali") {
            return () => {
                this.setState({ neutraali: this.state.neutraali + 1 })
            }
        }
    }

    render() {

        if (this.state.hyva === 0 && this.state.huono === 0 && this.state.neutraali === 0) {
            this.palautetta = false
        } else {
            this.palautetta = true
        }
        return (
            <div>
                <h3>anna palautetta</h3>
                <Button funktio={this.annaPalaute("hyva")} nimi="hyva" />
                <Button funktio={this.annaPalaute("neutraali")} nimi="neutraali" />
                <Button funktio={this.annaPalaute("huono")} nimi="huono" />
                <Statistics palautetta={this.palautetta} hyva={this.state.hyva} huono={this.state.huono}
                    neutraali={this.state.neutraali} />
            </div>
        )
    }

}

const Button = ({ funktio, nimi }) => {
    return (
        <button onClick={funktio}>{nimi}</button>
    )
}

const Statistics = (props) => {
    const kaikki = props.hyva + props.huono + props.neutraali
    const keskiarvo = (props.hyva * 1 + props.huono * (-1) + props.neutraali * 0) / kaikki
    const positiivisia = props.hyva / kaikki * 100 + "%"
    if (props.palautetta) {
        return (
            <div>
                <h3>statistiikka</h3>
                <table>
                    <tbody>
                        <Statistic text1="hyvä " text2={props.hyva} />
                        <Statistic text1="neutraali " text2={props.neutraali} />
                        <Statistic text1="huono " text2={props.huono} />
                        <Statistic text1="keskiarvo " text2={keskiarvo} />
                        <Statistic text1="positiivisia " text2={positiivisia} />
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div>
            <h3>statistiikka</h3>
            <p>ei yhtään palautetta annettu</p>
        </div>
    )
}

const Statistic = ({ text1, text2 }) => {
    return (
        <tr><td>{text1}{text2}</td></tr>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
