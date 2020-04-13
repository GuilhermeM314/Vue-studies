<template>
    <div class="door-area">
        <!-- a parte && !open faz com que, mesmo fechada, a porta não fique 
            ativa, ou seja com as bordas e maçaneta amarelas.-->
        <div class="door-frame" :class="{ selected: selected && !open }">
            <Gift v-if="open && hasGift"/>
        </div>
        <div class="door" :class="{ open }" 
            @click="selected = !selected">
            <div class="number" :class="{ selected }">{{ number }}</div>
            <div class="knob" :class="{ selected }"
                @click.stop="open = true"></div>
        </div>
    </div>
</template>

<script>
import Gift from './Gift'

export default {
    name: 'Door',
    components: { Gift },
    props: {
        // Essas propriedades serão passadas como parâmetros.
        // São somente para leitura, nada de edição.
        number: {},
        hasGift: { type: Boolean }
    },
    data() {
        // Estado inicial do data.
        return {
            open: false,
            selected: false,
        }
    }
}
</script>

<style>
:root {
    --door-border: 5px solid brown;
    --selected-border: 5px solid yellow;
}

.door-area {
    position: relative;
    width: 200px;
    height: 310px;
    border-bottom: 10px solid #AAA;
    margin-bottom: 20px;
    font-size: 3rem;

    display: flex;
    justify-content: center;
}

.door-frame {
    position: absolute;
    height: 300px;
    width: 180px;

    border-left: var(--door-border);
    border-top: var(--door-border);
    border-right: var(--door-border);

    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.door {
    position: absolute;
    top: 5px;
    height: 295px;
    width: 170px;
    background-color: chocolate;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.door .knob {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: brown;
    align-self: flex-start;
    margin-top: 60px;
}

.door-frame.selected {
    border-left: var(--selected-border);
    border-top: var(--selected-border);
    border-right: var(--selected-border);
}

.door .number.selected {
    color: yellow;
}

/* Elementos filhos devem ser colocados com um espaço
    (.door .knob).
    Apenas propriedades ou classes que admitem propriedades 
    devem ser colocadas juntas (.knob.selected).
*/

.door .knob.selected {
    background-color: yellow;
}

.door.open {
    background-color: #0007;
}

.door.open .knob {
    display: none;
}

.door.open .number {
    display: none;
}
</style>