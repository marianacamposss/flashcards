'use client';

import { useState, useRef } from 'react';

const flashcards = [
    {
        frente: 'O que é um Gerador Elétrico?',
        verso: 'Um dispositivo que transforma energia não elétrica (como química, luminosa ou mecânica) em energia elétrica, fornecendo-a a um circuito.'
    },
    {
        frente: 'O que é Força Eletromotriz (f.e.m.)?',
        verso: 'É a diferença de potencial (ddp) entre os terminais de um gerador quando ele não é percorrido por corrente elétrica.'
    },
    {
        frente: 'Qual a função de um Receptor Elétrico?',
        verso: 'Transforma energia elétrica em outras formas de energia (que não seja exclusivamente térmica), como energia mecânica (motores).'
    },
    {
        frente: 'O que é um Capacitor?',
        verso: 'É um componente eletrônico que armazena energia elétrica temporariamente, constituído por duas placas condutoras (armaduras) separadas por um material isolante (dielétrico).'
    },
    {
        frente: 'O que são a armadura coletora e a condensadora de um capacitor?',
        verso: 'A coletora ganha carga negativa (-), enquanto a condensadora fica com carga positiva (+).'
    },
    {
        frente: 'Qual a função de um Transformador?',
        verso: 'Aumentar ou diminuir a tensão elétrica em um circuito de corrente alternada (AC) sem mudar a potência (em condições ideais).'
    },
    {
        frente: 'Para que servem Fusíveis e Disjuntores?',
        verso: 'São dispositivos de proteção que protegem circuitos elétricos contra sobrecarga. O fusível é descartável, e o disjuntor é reutilizável.'
    },
    {
        frente: 'O que é um Dielétrico?',
        verso: 'É um material isolante, utilizado para separar as placas de um capacitor.'
    },
    {
        frente: 'Qual a diferença entre a função do resistor, gerador e receptor?',
        verso: 'Resistor: Transforma energia elétrica APENAS em energia térmica. Gerador: Transforma energia NÃO elétrica em energia elétrica. Receptor: Transforma energia elétrica em energia NÃO térmica.'
    },
    {
        frente: 'O que é um Gerador ideal?',
        verso: 'Um gerador que não tem resistência interna (r=0).'
    },
    {
        frente: 'O que é um Gerador real?',
        verso: 'Um gerador que possui resistência interna (r > 0), o que faz com que a ddp em seus terminais diminua à medida que a corrente aumenta.'
    },
    {
        frente: 'O que a equação U = E - r.i representa?',
        verso: 'A relação entre a tensão (U) nos terminais de um gerador, a f.e.m. (E), a resistência interna (r) e a corrente elétrica (i) que o percorre.'
    },
    {
        frente: 'O que o ponto de curto-circuito em um gráfico de gerador significa?',
        verso: 'É o ponto onde a tensão (U) é zero e a corrente elétrica é máxima (i_cc = E/r).'
    },
    {
        frente: 'O que a equação U = E\' + r\'.i representa?',
        verso: 'A relação entre a tensão (U) nos terminais de um receptor, a força contraeletromotriz (E\'), a resistência interna (r\') e a corrente elétrica (i) que o percorre.'
    },
    {
        frente: 'O que o gráfico de um gerador (ddp x corrente) indica?',
        verso: 'É uma reta decrescente. O ângulo da inclinação indica a resistência interna: quanto maior a inclinação, maior a resistência interna.'
    },
    {
        frente: 'O que o gráfico de um receptor (ddp x corrente) indica?',
        verso: 'É uma reta crescente. A ddp nos terminais do receptor aumenta com a corrente.'
    },
    {
        frente: 'O que é a Potência Total, Potência Útil e Potência Dissipada de um gerador?',
        verso: 'Potência Total (P_total) = E.i; Potência Útil (P_útil) = U.i; Potência Dissipada (P_dissipada) = r.i².'
    },
    {
        frente: 'O que é a Força Contraeletromotriz (f.c.e.m.)?',
        verso: 'É a diferença de potencial gerada por um receptor em oposição à corrente elétrica que o percorre.'
    },
    {
        frente: 'Quais são os principais tipos de bobina mencionados nos slides?',
        verso: 'Bobina de núcleo de ar, bobina de núcleo de ferrite e bobina toroidal.'
    },
    {
        frente: 'Como um transformador funciona?',
        verso: 'Um transformador usa um campo magnético variável gerado em uma bobina primária para induzir uma tensão em uma bobina secundária, com a tensão final dependendo da relação de voltas entre as bobinas.'
    }
];

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState(null);
    const swipeStartX = useRef(null);

    const handleFlip = () => {
        if (!isSwiping) {
            setIsFlipped(!isFlipped);
        }
    };

    const handleSwipeEnd = (direction) => {
        if (direction === 'right') {
            setCorrectCount(prev => prev + 1);
        } else if (direction === 'left') {
            setIncorrectCount(prev => prev + 1);
        }

        setSwipeDirection(direction);
        setIsSwiping(true);

        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % flashcards.length);
            setIsFlipped(false);
            setIsSwiping(false);
            setSwipeDirection(null);
        }, 500);
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setCorrectCount(0);
        setIncorrectCount(0);
        setIsFlipped(false);
        setIsSwiping(false);
        setSwipeDirection(null);
    };

    const onStart = (e) => {
        swipeStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    };

    const onMove = (e) => {
        if (swipeStartX.current === null) return;
        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - swipeStartX.current;
        const flashcardElement = e.currentTarget;
        flashcardElement.style.transform = `translateX(${deltaX}px)`;
    };

    const onEnd = (e) => {
        if (swipeStartX.current === null) return;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const deltaX = endX - swipeStartX.current;
        const flashcardElement = e.currentTarget;

        if (deltaX > 100) {
            handleSwipeEnd('right');
        } else if (deltaX < -100) {
            handleSwipeEnd('left');
        } else {
            flashcardElement.style.transform = '';
        }
        flashcardElement.style.transition = 'transform 0.8s, opacity 0.5s';
        swipeStartX.current = null;
    };


    return (
        <>
            <main className="container">
                <div className="score">
                    <span id="correct-count" className="correct">Acertos: {correctCount}</span>
                    <span id="incorrect-count" className="incorrect">Erros: {incorrectCount}</span>
                </div>
                <div className="card-container">
                    <div 
                        className={`flashcard ${isFlipped ? 'is-flipped' : ''} ${isSwiping ? `swipe-${swipeDirection}` : ''}`}
                        onClick={handleFlip}
                        onMouseDown={onStart}
                        onMouseMove={onMove}
                        onMouseUp={onEnd}
                        onTouchStart={onStart}
                        onTouchMove={onMove}
                        onTouchEnd={onEnd}
                    >
                        <div className="flashcard-face flashcard-front">
                            <p>{flashcards[currentIndex].frente}</p>
                        </div>
                        <div className="flashcard-face flashcard-back">
                            <p>{flashcards[currentIndex].verso}</p>
                        </div>
                    </div>
                </div>

                <div className="controls">
                    <button onClick={handleRestart}>Reiniciar</button>
                </div>
                
                <div className="counter">
                    <span>{currentIndex + 1}/{flashcards.length}</span>
                </div>
            </main>
        </>
    );
}