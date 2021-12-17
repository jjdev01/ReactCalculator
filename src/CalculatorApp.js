import React from 'react';

class CalculatorApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentExpression: '0' }
        this.currentOperator = CALC_OP.NONE;
        this.numberPress = this.numberPress.bind(this);
        this.operatorPress = this.operatorPress.bind(this);
        this.appendExpression = this.appendExpression.bind(this);
        this.validOperation = this.validOperation.bind(this);
    }

    appendExpression(value) {
        var expr = (this.state.currentExpression === '0') ? '' : this.state.currentExpression;
        expr += value;
        this.setState({ currentExpression: expr });

        console.log("currentExpression: ", expr);
    }

    numberPress(event) {
        console.log("pressed ", event.target.value);
        this.currentOperator = CALC_OP.NONE;
        this.appendExpression(event.target.value);
    }

    validOperation() {
        if (this.currentOperator !== CALC_OP.NONE) {
            console.log("invalid. current opreator: ", this.currentOperator);
            return false;
        }
        return true;
    }

    operatorPress(event) {
        var operator = parseInt(event.target.value);

        switch (operator) {
            case CALC_OP.ADD:
                if (this.validOperation()) {
                    this.appendExpression('+');
                }
                break;
            case CALC_OP.SUB:
                if (this.validOperation()) {
                    this.appendExpression('-');
                }
                break;
            case CALC_OP.MUL:
                if (this.validOperation()) {
                    this.appendExpression('*');
                }
                break;
            case CALC_OP.DIV:
                if (this.validOperation()) {
                    this.appendExpression('/');
                }
                break;
            case CALC_OP.EQL:
                this.currentOperator = CALC_OP.NONE;
                this.setState({ currentExpression: eval(this.state.currentExpression) });
                break;
            case CALC_OP.CLR:
                this.currentOperator = CALC_OP.NONE;
                this.setState({ currentExpression: '0' });
                break;
            default:
                break;
        }

        if (operator !== CALC_OP.CLR && operator !== CALC_OP.EQL) {
            this.currentOperator = operator;
        }
    }

    render() {
        return (
            <div className="calculatorApp">
                <div style={style.body}>
                    <div className="row">
                        <p>{this.state.currentExpression}</p>
                    </div>

                    <div className="row" style={style.buttonRow}>
                        <div style={style.button}><button style={style.buttonInternal} value="1" onClick={this.numberPress}>1</button></div>
                        <div style={style.button}><button style={style.buttonInternal} value="2" onClick={this.numberPress}>2</button></div>
                        <div style={style.button}><button style={style.buttonInternal} value="3" onClick={this.numberPress}>3</button></div>
                        <div style={style.button}><button style={style.buttonInternal} value="4" onClick={this.numberPress}>4</button></div>
                    </div>
                    
                    <div className="row" style={style.buttonRow}>
                        <div style={style.button}><button style={style.buttonInternal} value={CALC_OP.ADD} onClick={this.operatorPress}>+</button></div>
                        <div style={style.button}><button style={style.buttonInternal} value={CALC_OP.SUB} onClick={this.operatorPress}>-</button></div>
                        <div style={style.button}><button style={style.buttonInternal} value={CALC_OP.DIV} onClick={this.operatorPress}>/</button></div>
                        <div style={style.button}><button style={style.buttonInternal} value={CALC_OP.MUL} onClick={this.operatorPress}>*</button></div>
                    </div>

                    <div className="row" style={style.buttonRow}>
                        <div style={style.button}><button style={style.buttonInternal} value={CALC_OP.CLR} onClick={this.operatorPress}>C</button></div>
                        <div style={style.button}><button style={style.buttonInternal} value="0" onClick={this.numberPress}>0</button></div>
                        <div style={style.button}><button style={style.buttonInternal} value={CALC_OP.EQL} onClick={this.operatorPress}>=</button></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalculatorApp;

const CALC_OP = {
    NONE: -1,
    ADD: 0, SUB: 1, MUL: 2, DIV: 3, EQL: 4, CLR: 5
};

const style = {
    body: {
        width: 400, height: 550,
        backgroundColor: "#99f",
        display: "flex", flexDirection: "column"
    },
    buttonRow: {
        backgroundColor: "#aaf", height: 100, margin: 5,
        display: "flex", flexDirection: "row", justifyContent: "space-between"
    },
    button: {
        backgroundColor: "#ccc", width: 64, margin: 10
    },
    buttonInternal: { width: "100%", height: "100%" }
}
