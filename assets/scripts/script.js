const senhaAleatoriaContainer = document.querySelector("#senhaAleatoria")
const quantidadeCaracteres = document.querySelector("#number-caracteres")
const letraMaiusculaCheck = document.querySelector("#letra-maiuscula")
const letraMinusculaCheck = document.querySelector("#letra-minusculas")
const incluirNumeroCheck = document.querySelector("#incluir-numero")
const caracteresEspeciaisCheck = document.querySelector("#caracteres-especiais")
const botaoGerarSenha = document.querySelector("#butaoGerarSenha")

quantidadeCaracteres.addEventListener("change", (e) => {
    //Controlar o valor do input
    if (e.target.value < 8) {
        e.target.value = 8
    } else if (e.target.value > 40) {
        e.target.value = 40
    }
})

const mostrarNotificacao = () => {
    document.querySelector(".notificacao").classList.add("active")

    setTimeout(() => {
        document.querySelector(".notificacao").classList.remove("active")
    }, 3000)
}

const numerosAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const gerarSenha = () => {
    const senhaAleatoriaList = []

    letraMaiusculaCheck.checked && senhaAleatoriaList.push("QWERTYUIOPLKJHGFDSAZXCVBNM")
    letraMinusculaCheck.checked && senhaAleatoriaList.push("qwertyuioplkjhgfdsazxcvbnm")
    incluirNumeroCheck.checked && senhaAleatoriaList.push("0987654321")
    caracteresEspeciaisCheck.checked && senhaAleatoriaList.push(",<.>;:/?][}{^~\|=+-_()")

    //Checar se ao menos 2 condições são verdadeiros, usando uma lista para armazenar o resultado de múltiplas condições
    const inputsCheckeds = [caracteresEspeciaisCheck.checked, incluirNumeroCheck.checked, letraMaiusculaCheck.checked, letraMinusculaCheck.checked]
    const inputsTrues = inputsCheckeds.filter(input => input).length
    if (inputsTrues < 2) {
        mostrarNotificacao()
        return false
    }

    let senhaAleatoriaString = ""
    senhaAleatoriaList.forEach(string => senhaAleatoriaString += string)

    const numeroCaracteres = quantidadeCaracteres.value

    let senhaAleatoria = ""
    for (let i = 0; i < numeroCaracteres; i++) {
        const tamanhoSenha = senhaAleatoriaString.length
        senhaAleatoria += senhaAleatoriaString[(numerosAleatorio(0, tamanhoSenha))]
    }

    senhaAleatoriaContainer.textContent = senhaAleatoria

    return true
}

const mostrarBotaoCopiar = () =>{
    botaoCopiar.style.display = "block"
}

botaoGerarSenha.addEventListener("click",() =>{
    gerarSenha() && mostrarBotaoCopiar()
})

const trocarIconeCopiar = (e) => {
    //Trocar icone do botão de copiar
    e.target.src = "assets/imgs/comentar-alt-check.png"

    setTimeout(() => e.target.src = "assets/imgs/copiar-alt.png", 3000)
}

const copiarSenha = () => {
    navigator.clipboard.writeText(senhaAleatoriaContainer.textContent).then(
        () => {console.log("texto copiado")}
    ).catch(err => console.log("Erro ao copiar o texto", err))
}

const botaoCopiar = document.querySelector("#botao-copiar")
botaoCopiar.addEventListener("click", (e) => {
    trocarIconeCopiar(e)
    copiarSenha()
})