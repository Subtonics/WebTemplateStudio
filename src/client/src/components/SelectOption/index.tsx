import * as React from 'react';
import classNames from 'classnames';

import Card from '../Card';;

import grid from '../../css/grid.module.css';
import styles from './styles.module.css';

import { Option } from '../../types/option';

type SelectOptionProps = {
    title: string,
    options: Array<Option>,
    multiSelect: boolean
};

type SelectOptionState = {
    options: Array<Option>,
    selectedCards: Array<number>
};

class SelectOption extends React.Component<SelectOptionProps,SelectOptionState> {
    constructor(props: any) {
        super(props)
        this.state = {
            options: this.props.options,
            selectedCards: []
        }
    }

    public isCardSelected(cardNumber: number): boolean {
        return this.state.selectedCards.includes(cardNumber)
    }

    public removeOption(cardNumber: number) {
        const { selectedCards } = this.state;
        let filteredCards = selectedCards;
        if (this.isCardSelected(cardNumber)) {
            filteredCards = filteredCards.filter((val) => val !== cardNumber);
        } else {
            filteredCards.push(cardNumber);
        }
        this.setState({
            selectedCards: filteredCards
        });
    }

    public exchangeOption(cardNumber: number) {
        const { selectedCards } = this.state;
        selectedCards.pop();
        selectedCards.push(cardNumber);
        this.setState({
            selectedCards
        })
    }

    public onCardClick(cardNumber: number) {
        if (this.props.multiSelect) {
            this.removeOption(cardNumber);
        } else {
            this.exchangeOption(cardNumber);
        }   
    }

    public render() {
        const { options } = this.state;
        return (
            <div>
                <div className={grid.row}>
                    <div className={classNames(grid.col12, styles.title)}>
                        { this.props.title }
                    </div>
                </div>
                <div className={styles.container}>
                    { options.map((option, cardNumber) => <Card onCardClick={(cardNumber: number) => {this.onCardClick(cardNumber)}} cardNumber={cardNumber} selected={this.isCardSelected(cardNumber)} iconPath={option.svgUrl} iconStyles={styles.icon} title={option.title} body={option.body} />)}
                </div>
            </div>
        )
    }
}

export default SelectOption;