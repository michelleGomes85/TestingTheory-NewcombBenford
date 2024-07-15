const textarea = document.getElementById('numbers');
const separatorSelect = document.querySelector('#separator');
const progress_bar = document.querySelector('#progress-bar');
const cont_span = document.querySelector('.cont');
const max_span = document.querySelector('.max');
const graphic = document.querySelector('.graphic');
const btn_analyze = document.querySelector('#btn-analyze');

let myChart = null;

separatorSelect.onchange = function() {
    textarea.value = '';
    textarea.style.borderColor = '#ccc';
    updateProgress();
}

textarea.onkeyup = function (event) {

    if (event.key != separatorSelect.value)
        updateProgress();
}

btn_analyze.onclick = function () {

    if (textarea.value.trim() != '') {
        textarea.style.borderColor = 'green';
        let separator = (separatorSelect.value == 'Enter') ? '\n' : separatorSelect.value;
        const numArray = textarea.value.trim().split(separator);

        let array = cont_numbers(numArray);;
        show(array);
    }else {
        textarea.style.borderColor = 'red';
        textarea.focus();
    }
}

textarea.addEventListener('keydown', function (event) {
    
    let key = separatorSelect.value;

    const allowedKeys = [
        'Backspace', 'Delete', 'Tab',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'End', 'Home'
    ];

    // Verifica se a tecla pressionada é um número ou o separador
    const isAllowedNumberOrSeparator = (event.key >= '0' && event.key <= '9') || event.key === key;

    // Permite CTRL+C, CTRL+V e CTRL+A
    const isCopyPaste = (event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'v' || event.key === 'a') ;

    if (!(isAllowedNumberOrSeparator || allowedKeys.includes(event.key) || isCopyPaste))
        event.preventDefault();
});

function verify_progress(numbers) {

    let cont = 0;
    for (let i = 0; i < numbers.length; i++) {

        if (numbers[i][0] >= '1' && numbers[i][0] <= '9')
            cont++;
    }

    return cont;
}

function updateProgress() {

    let separator = (separatorSelect.value == 'Enter') ? '\n' : separatorSelect.value;
    const numArray = textarea.value.trim().split(separator);

    let cont = verify_progress(numArray);
    let progress = (cont / 50) * 100;

    progress_bar.style.width = progress + '%';

    let color;

    if (cont <= 25)
        color = 'red';
    else if (cont <= 49)
        color = '#FFC107';
    else {
        color = 'green';
    }

    progress_bar.style.backgroundColor = color;
    cont_span.style.color = color;

    if (cont > 50)
        max_span.innerHTML = cont;

    cont_span.innerHTML = cont;

    if (cont == 0)
        graphic.style.display = 'none';
}

function cont_numbers(vet) {

    let numbers = new Array(9).fill(0);

    for (let i = 0; i < vet.length; i++) {

        if (vet[i]) {
            let num = parseInt(vet[i][0]);
            if (num >= 1 && num <= 9)
                numbers[num - 1]++;
        }
    }

    return numbers;
}

function show(numbers) {

    if (myChart)
        myChart.destroy();

    const ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [{
                label: 'Frequência do Primeiro Dígito',
                data: numbers,
                backgroundColor: 'rgba(3, 130, 136, 0.5)',
                borderColor: 'rgba(3, 130, 136, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    });

    graphic.style.display = 'flex';

    scroll_to_graphic();
}

function scroll_to_graphic() {
	const height_top = document.querySelector('.container-outside').offsetHeight;
    window.scrollBy({
        top: height_top,
        left: 100,
        behavior: 'smooth'
    });
}