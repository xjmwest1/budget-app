import React from 'react';
import { Container, Columns, Button } from 'react-bulma-components/full';
import Transaction from 'budget-app-interface/models/Transaction';
import BudgetCategory from 'budget-app-interface/models/BudgetCategory';
import { getBudgetCategories, postBudgetCategory } from 'src/api/budgetCategory';

import './App.css';

interface Props {
}

interface State {
    transactions: Array<Transaction>;
    budgetCategories: Array<BudgetCategory>;
    newBudgetCategory: any;
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

        this.handleNewBudgetCategoryTitleChange = this.handleNewBudgetCategoryTitleChange.bind(this);
        this.submitNewBudgetCategory = this.submitNewBudgetCategory.bind(this);
        this.handleNewBudgetCategoryAmountChange = this.handleNewBudgetCategoryAmountChange.bind(this);
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

    private handleNewBudgetCategoryTitleChange(event: any) {
        event.persist();
        this.setState(prevState => ({
            newBudgetCategory: {
                ...(prevState.newBudgetCategory || {}),
                title: event.target.value
            }
        }));
        event.preventDefault();
    }

    private handleNewBudgetCategoryAmountChange(event: any) {
        event.persist();
        this.setState(prevState => ({
            newBudgetCategory: {
                ...(prevState.newBudgetCategory || {}),
                amount: event.target.value
            }
        }));
        event.preventDefault();
    }

    private submitNewBudgetCategory(event: any) {
        const budgetCategory: BudgetCategory = this.state.newBudgetCategory;
        postBudgetCategory(budgetCategory);
        event.preventDefault();
    }

    private getNewBudgetCategory() {
        return (
            <Columns>
                <Columns.Column className="is-4">
                    <input className="input" type="text" placeholder="New Budget Category" onChange={this.handleNewBudgetCategoryTitleChange}></input>
                </Columns.Column>
                <Columns.Column className="is-2">
                    <input className="input" type="text" placeholder="Amount" onChange={this.handleNewBudgetCategoryAmountChange}></input>
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
