# Music Maker

A simple way to make a song using a variety of instruments.

## Motivation

Making music can be hard, especially when you've never played an instrument before. Music Maker aims to simplify this by providing a simple visual tool to make short songs or beats with that anyone can get started on. 

## Features

- Simple to use UI to view and add notes
- Ability to draw in and resize notes by dragging the mouse
- Dynamic cursors to indicate note actions while moving / resizing
- Resizer bars which appear only when resizing notes
- 5 different instruments which can all be played simultaneously
- Tabs to swtich between each instrument's view to manage all notes quickly
- Ability to export notes to JSON, and import them back in to continue working

## How to Use

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Click on a key and drag your cursor to add a note. You can see the note as it is being added. Let go of the mouse to finish adding.

Double click on a note to remove.

Hover over a note to see the grab cursor. Hold and drag a note to move it around. Hover around the end of a note to see the resizer and see the resize cursor. Hold and drag left or right to resize the note.

Click the different tabs on top to switch between instruments and add notes to each one.

Click play to hear your music loop played.

Click Export to Export your current notes to JSON. Click Import to upload a JSON file with notes to display and play them.
