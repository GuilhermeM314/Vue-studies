<template>
    <div class="calculator">
        <!--Tem que envolver os componentes numa DIV-->
        <Display :value="displayValue" @onClick="addDigit" />
        <Button label="AC" triple @onClick="clearMemory" />
        <Button label="/" operation @onClick="setOperation"/>
        <Button label="7" @onClick="addDigit" />
        <Button label="8" @onClick="addDigit" />
        <Button label="9" @onClick="addDigit" />
        <Button label="*" operation @onClick="setOperation"  />
        <Button label="4" @onClick="addDigit" />
        <Button label="5" @onClick="addDigit" />
        <Button label="6" @onClick="addDigit" />
        <Button label="-" operation @onClick="setOperation" />
        <Button label="1" @onClick="addDigit" />
        <Button label="2" @onClick="addDigit" />
        <Button label="3" @onClick="addDigit" />
        <Button label="+" operation @onClick="setOperation" />
        <Button label="0" double @onClick="addDigit" />
        <Button label="." @onClick="addDigit" />
        <Button label="=" operation @onClick="setOperation" />
    </div>
</template>

<script>
import Display from "../components/Display"
import Button from "../components/Button"

export default {
    // Quando usar um component deve-se registrar esses
    // componentes aqui.
    data: function() {
        return {
            displayValue: "0",
            clearDisplay: false,
            operation: null,
            values: [0, 0],
            current: 0,
        }
    },
    // Os componentes devem ser referênciados.
    components: { Button, Display },
    methods: {
        clearMemory() {
            // Atribui ao this.$data o estado inicial do objeto da função
            // data.
            Object.assign(this.$data, this.$options.data())
            // O $options.data() é o estado inicial do objeto tipo data.
        },
        setOperation(operation) {
            if (this.current === 0) {
                this.operation = operation
                this.current = 1
                this.clearDisplay = true
            } else {
                const equals = operation === "="
                const currentOperation = this.operation
                
                try {
                    this.values[0] = eval(
                        `${this.values[0]} ${currentOperation} ${this.values[1]}`
                    )
                } catch (e) {
                    this.$emit('onError', e)
                }

                this.values[1] = 0

                this.displayValue = this.values[0]
                this.operation = equals ? null : operation
                this.current = equals ? 0 : 1
                this.clearDisplay = !equals
            }
        },
        addDigit(n) {
            if(n === "." && this.displayValue.includes(".")){
                return
            }

            const clearDisplay = this.displayValue === "0" 
                || this.clearDisplay
            const currentValue = clearDisplay ? "" : this.displayValue
            const displayValue = currentValue + n

            // Tem que acessar o this para alterar os dados do componente
            this.displayValue = displayValue
            this.clearDisplay = false
            // Alternativa 1:
            // this.values[this.current] = displayValue

            // Alternativa 2:
            if(n !== ".") {
                const i = this.current
                // displayValue de String pra Float
                const newValue = parseFloat(displayValue)
                this.values[i] = newValue
            }
        }
    }
}
</script>

<style>
    .calculator {
        height: 320px;
        width: 235px;
        border-radius: 5px;
        overflow: hidden;

        display: grid;
        grid-template-columns: repeat(4, 25%);
        grid-template-rows: 1fr 48px 48px 48px 48px 48px;
    }
</style>