const textarea = document.getElementById('numbers');
const separatorSelect = document.querySelector('#separator');
const progress_bar = document.querySelector('#progress-bar');
const cont_span = document.querySelector('.cont');
const graphic = document.querySelector('.graphic');
const btn_analyze = document.querySelector('#btn-analyze');

let myChart = null;

separatorSelect.onchange = function() {
    textarea.value = '';
    updateProgress();
}

textarea.onkeyup = function (event) {

    if (event.key != separatorSelect.value)
        updateProgress();
}

btn_analyze.onclick = function () {

    if (textarea.value != '') {
        let separator = (separatorSelect.value == 'Enter') ? '\n' : separatorSelect.value;
        const numArray = textarea.value.trim().split(separator);

        let array = cont_numbers(numArray);;
        show(array);
    }
}

textarea.addEventListener('keydown', function (event) {

    let key = separatorSelect.value;

    if (!(
        (event.key >= '0' && event.key <= '9') ||
        event.key === key ||
        event.key === 'Backspace' || event.key === 'Delete' || event.key === 'Tab' ||
        event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' || event.key === 'End' || event.key === 'Home'
    ))
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
    cont_span.innerHTML = (cont < 50) ? cont : 50;

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

    const colors = [
        'rgba(3, 130, 136, 0.5)',
        'rgba(21, 108, 153, 0.5)',
        'rgba(224, 248, 255, 0.5)',
        'rgba(10, 160, 9, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)'
    ];

    const borderColors = [
        'rgba(3, 130, 136, 1)',
        'rgba(21, 108, 153, 1)',
        'rgba(224, 248, 255, 1)',
        'rgba(10, 160, 9, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
    ];

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [{
                label: 'Frequência do Primeiro Dígito',
                data: numbers,
                backgroundColor: colors,
                borderColor: borderColors,
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