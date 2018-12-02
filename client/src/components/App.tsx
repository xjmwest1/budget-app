import * as React from 'react';
import { Container, Columns, Button } from 'react-bulma-components/full';
import Transaction from 'budget-app-interface/models/Transaction';
import BudgetCategory from 'budget-app-interface/models/BudgetCategory';
import { getBudgetCategories } from 'src/api/budgetCategory';

import './App.css';

interface Props {
}

interface State {
    transactions: Array<Transaction>;
    budgetCategories: Array<BudgetCategory>;
    newBudgetCategory: BudgetCategory | null;
    error?: Error;
}

class App extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            transactions: [],
            budgetCategories: [],
            newBudgetCategory: null
        };
    }

    componentDidMount() {
        getBudgetCategories()
            .then(budgetCategories => this.setState({ budgetCategories }))
            .catch(err => this.setState({ error: err.message }));
    }

    private getBudgetCategories() {
        if (!this.state.budgetCategories || this.state.budgetCategories.length <= 0) {
            return null;
        }

        return (
            <ol>
                {this.state.budgetCategories.map((budgetCategory) => {
                    return <li className='box'>{budgetCategory.title} (${budgetCategory.amount})</li>
                })}
            </ol>
        );
    }

    private handleNewBudgetCategoryTitleChange(event) {
        this.setState()
    }

    private handleNewBudgetCategoryTitleChange(event) {

    }

    private submitNewBudgetCategory() {

    }

    private getNewBudgetCategory() {
        return (
            <Columns>
                <Columns.Column className="is-4">
                    <input className="input" type="text" placeholder="New Budget Category" onChange={this.handleChange}></input>
                </Columns.Column>
                <Columns.Column className="is-2">
                    <input className="input" type="text" placeholder="Amount" onChange={this.handleChange}></input>
                </Columns.Column>
                <Columns.Column className="is-1">
                    <Button onClick={this.submitNewBudgetCategory}>+</Button>
                </Columns.Column>
            </Columns>
        );
    }

    render() {
        return (
            <Container>
                    {this.state.error ? <div>{this.state.error}</div> : null }

                    {this.getBudgetCategories()}
                    {this.getNewBudgetCategory()}
            </Container>
        );
    }
}

export default App;
