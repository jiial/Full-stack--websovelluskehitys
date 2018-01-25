import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: Math.floor(Math.random() * 6),
            votes: 0,
            max: 0
        }
        this.next = this.next.bind(this)
        this.vote = this.vote.bind(this)
    }

    next = () => {
        const n = Math.floor(Math.random() * 6)
        return () => {
            this.setState({ selected: n, votes: votes[n] })
        }
    }

    vote = (i) => {
        const x = votes[this.state.selected] + 1
        return () => {
            votes[this.state.selected] = x
            const m = this.updateMax()
            this.setState({ votes: x, max: m })
        }
    }

    updateMax = () => {
        let x = 0
        let ret = 0
        for (let index = 0; index < this.props.votes.length; ++index) {
            let value = this.props.votes[index];
            if (value > x) {
                x = value
                ret = index
            }
        }
        return ret
    }

    render() {
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <p>has {this.state.votes} votes</p>
                <Button function={this.vote(this.state.selected)} text="vote" />
                <Button function={this.next()} text="next anecdote" />
                <h4>anecdote with most votes:</h4>
                <p>{this.props.anecdotes[this.state.max]}</p>
                <p>has {this.props.votes[this.state.max]} votes</p>
            </div>
        )
    }
}

const Button = (props) => (
    <button onClick={props.function}>{props.text}</button>
)

const votes = [
    0,
    0,
    0,
    0,
    0,
    0
]

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} votes={votes} />,
    document.getElementById('root')
)

