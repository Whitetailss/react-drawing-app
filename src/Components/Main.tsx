import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom';
import '../Styles/Main.css'

import {
    styled,
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps,
    Box as MuiBox, BoxProps as MuiBoxProps,
    Button as MuiButton,
    ButtonProps as MuiButtonProps
} from '@mui/material';

//     C w h           Should create a new canvas of width w and height h.
// L x1 y1 x2 y2   Should create a new line from (x1,y1) to (x2,y2). Currently only
//                 horizontal or vertical lines are supported. Horizontal and vertical lines
//                 will be drawn using the 'x' character.
// R x1 y1 x2 y2   Should create a new rectangle, whose upper left corner is (x1,y1) and
//                 lower right corner is (x2,y2). Horizontal and vertical lines will be drawn
//                 using the 'x' character.
// N                 Clear the canvas
// Z               Should undo the last command.
// X               Should redo the last undo command.
// Q               Should quit the program.


const StyledWrapperMuiBox = styled(MuiBox, {
    name: 'StyledWrapperMuiBox'
})<MuiBoxProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: '16px 0px 16px 0px',
}))

const StyledMuiButton = styled(MuiButton, {
    name: 'StyledMuiButton'
})<MuiButtonProps>(({ theme }) => ({
    width: '100px',
    height: '40px',
    margin: '12px 20px 0px 20px'
}))

const StyledMuiTextField = styled(MuiTextField, {
    name: 'StyledMuiTextField'
})<MuiTextFieldProps>(({ theme }) => ({
    margin: '12px 20px 0px 20px'
}))

let initialHistory = [[]];

// Mock potential history
// let initialHistory = [[], ["L"], ["L", "R"], ["L", "R", "L"], []];

// Mock undo initialHistory
// let initialHistory = [[], ["L"], ["L", "R"], ["L", "R", "L"]];

function Main() {

    const [command, setCommand] = useState('')
    const [history, setHistory] = useState<(String | null | undefined)[][]>(initialHistory)
    const [status, setStatus] = useState('empty')

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const validatedCommandRef = useRef<String | null | undefined>(null)
    const redoHistoryRef = useRef<unknown | null>(null)

    console.log('history', history);

    let undoDisabled = true
    if (history.length > 1){
        undoDisabled = false;
    }

    let redoDisabled = true
    if (status === "undone") {
        redoDisabled = false;
    }

    let clearDisabled = true
    if (history[history.length - 1].length !== 0) {
        clearDisabled = false
    }

    let sendDisabled = true
    if (status === 'typing' && command !== ''){
        sendDisabled = false;
    }

    let receivedCommand = '';
    if (status === 'sent') {
        receivedCommand = command
    }

    const operateCommand = (commandType: string, commandDetails: number[], ctx: CanvasRenderingContext2D) => {
        switch (commandType) {
            case "L":
                ctx.moveTo(commandDetails[1], commandDetails[2])
                ctx.lineTo(commandDetails[3], commandDetails[4])
                ctx.stroke()
                break;

            case "R":
                ctx.beginPath()
                ctx.rect(commandDetails[1], commandDetails[2], commandDetails[3], commandDetails[4])
                ctx.stroke()
                break;

            default:
                console.log('error');
        }
    }

    // Validate received command: requires further developement
    useEffect(() => {
        if (status === 'sent') {

            const validateCommand = (input: string) => {
                if (typeof input === 'string') {
                    return input
                } else {
                    console.log('invalid command')
                }
            }

            validatedCommandRef.current = validateCommand(receivedCommand)
            setStatus('await execution')
        }

        return () => {

        }
    }, [receivedCommand, status])

    // Operate the command
    useEffect(() => {

        if (status === 'await execution') {

            let commandType = validatedCommandRef.current?.[0];
            let commandDetails: any[] = [];

            if (validatedCommandRef.current !== null) {

                commandDetails = validatedCommandRef.current!.split(" ");
                const canvas = canvasRef.current

                if (canvas == null) return;
                const ctx = (canvas as HTMLCanvasElement).getContext("2d")
                if (ctx == null) return;

                operateCommand(commandType!, commandDetails, ctx)
            }

            const currentHistory = [...history[history.length - 1], validatedCommandRef.current]
            const updatedHistory = [...history, currentHistory]

            setHistory(updatedHistory)
            setStatus('empty')
            setCommand('')
        }

        return () => {

        }
    }, [history, status])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus('typing')
        const newCommand = e.currentTarget.value
        setCommand(newCommand)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('sent')
    }

    const handleUndo = () => {
        const canvas = canvasRef.current

        if (canvas == null) return;
        const ctx = (canvas as HTMLCanvasElement).getContext("2d")
        if (ctx == null) return;

        ctx.clearRect(0, 0, 800, 400);

        const currentHistory = [...history[history.length - 2]]

        currentHistory.forEach(command => {
            let commandDetails: any[] = command!.split(" ")
            operateCommand(command![0], commandDetails, ctx)
        })

        redoHistoryRef.current = [history[history.length - 1]]

        const updatedHistory = [...history.slice(0, history.length-1), ...history.slice(history.length)]
        setHistory(updatedHistory)
        setStatus("undone")
    }

    const handleClear = () => {

        const canvas = canvasRef.current

        if (canvas == null) return;
        const ctx = (canvas as HTMLCanvasElement).getContext("2d")
        if (ctx == null) return;

        ctx.clearRect(0, 0, 800, 400);

        const updatedHistory = [...history, []]
        setHistory(updatedHistory)
        setStatus('cleared')
    }

    const handleRedo = () => {

        const redoHistory: unknown = redoHistoryRef.current

        const canvas = canvasRef.current

        if (canvas == null) return;
        const ctx = (canvas as HTMLCanvasElement).getContext("2d")
        if (ctx == null) return;

        if(redoHistory instanceof Array){
            ctx.clearRect(0, 0, 800, 400);


            redoHistory[0].forEach((command:  String)=> {
                        let commandDetails: any[] = command!.split(" ");
                        operateCommand(command![0], commandDetails, ctx)
                    })
            
        const updatedHistory = [...history, redoHistory[0]]
        setHistory(updatedHistory)
        setStatus('empty')

        }
    }

    return (
        <div className="Main">
            <h1 id="header"> L 150 100 350 300 </h1>
            <h1 id="header"> L 350 100 550 100 </h1>
            <h1 id="header">  L 50 50 50 250 </h1>
            <h1 id="header">  R 100 90 20 50 </h1>
            <h1 id="header">  R 80 20 200 200 </h1>
            <h1 id="header">  R 550 150 200 200 </h1>

            <h1 id="header"> N </h1>
            <h1 id="header"> Z </h1>
            <h1 id="header"> X </h1>
            <h1 id="header"> Q </h1>

            <form onSubmit={handleSubmit}>
                <StyledWrapperMuiBox>
                    <StyledMuiTextField id="outlined-basic" label="Command" variant="outlined" value={command} onChange={handleChange} placeholder="Type command" />
                    <StyledMuiButton variant="contained" type="submit" disabled={sendDisabled} > Send </StyledMuiButton>
                    <StyledMuiButton variant="contained" onClick={handleClear} disabled={clearDisabled} > Clear </StyledMuiButton>
                    <StyledMuiButton variant="contained" onClick={handleUndo} disabled={undoDisabled} > Undo </StyledMuiButton>
                    <StyledMuiButton variant="contained" onClick={handleRedo} disabled={redoDisabled}> Redo </StyledMuiButton>
                </StyledWrapperMuiBox>
            </form>
            <canvas className="canvas" width="800" height="400" ref={canvasRef}>
            </canvas>

        </div>
    )
}

export default Main


