import { useEffect, useState } from 'react';
import { question } from '../../utility/question';
import './Quiz.css';

export const Quiz = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [allPage, setAllPage] = useState(3);
    const [selectedAnswer, setSelectedAnswer] = useState(false);
    const [classElement, setClassElement] = useState('');
    const [choice, setChoice] = useState(false);
    const [circleClasses, setCircleClasses] = useState(['circle', 'circle', 'circle']);
    const [finish, setFinish] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const currentQuestion = question[currentPage - 1]

    useEffect(() => {
        setCorrectAnswer(
            circleClasses.reduce((acc, item) => {
                acc += (item === 'circle-correct circle')
                return acc
            }, 0)
        )
    }, [circleClasses])

    const handlerAnswer = (ans, index) => {
        if (!choice) {
            setSelectedAnswer(index)
            if (ans) {
                setClassElement("correct element")
                const newCircleClasses = [...circleClasses];
                newCircleClasses[currentPage - 1] = 'circle-correct circle';
                setCircleClasses(newCircleClasses);
            } else {
                setClassElement("in-correct element");
                const newCircleClasses = [...circleClasses];
                newCircleClasses[currentPage - 1] = 'circle-in-correct circle';
                setCircleClasses(newCircleClasses);
            }
        }
        setChoice(true)
        if (currentPage === 3) {
            setFinish(true)
        }
    }

    const handlerNext = () => {
        setCurrentPage(prev => prev + 1)
        setSelectedAnswer(false);
        setChoice(false)
    }

    const handlerRepeat = () => {
        setCurrentPage(1)
        setFinish(false)
        setSelectedAnswer(false)
        setClassElement('')
        setChoice(false)
        setCircleClasses(['circle', 'circle', 'circle'])
    }

    return (
        <div className='container'>
            <h2>Question {currentPage} of {allPage}</h2>
            <hr />
            <p>{currentQuestion.question}</p>
            {currentQuestion.answers.map((item, index) =>
                <div
                    key={index}
                    className={selectedAnswer === index ? classElement : 'element'}
                    onClick={() => handlerAnswer(item.isCorrect, index)}
                >
                    {item.text}
                </div>
            )}
            <button
                className={choice && currentPage !== 3 ? 'button-next' : 'button-next button-not-active'}
                disabled={!choice || currentPage === allPage}
                onClick={handlerNext}
            >Next
            </button>
            <div className="block-circle">
                <div className={circleClasses[0]}></div>
                <div className={circleClasses[1]}></div>
                <div className={circleClasses[2]}></div>
            </div>
            <div className={finish ? "info" : 'info info-hidden'}>
                <p>Your result: {correctAnswer}</p>
                <button onClick={handlerRepeat}>To repeat!!!</button>
            </div>
        </div>
    )
}