import React from 'react';
import Classes from './editorSetting.module.css';

export default function editorSetting({ getLanguage, getTheme }) {
    return (
        <div>
            <label className={Classes.controlLabel}>Language</label>
            <select className={Classes.picker} onChange={getLanguage}>
                <option>JavaScript</option>
                <option>C++</option>
                <option>C</option>
                <option>Python3</option>
                <option>Go</option>
            </select>
            <label className={Classes.controlLabel}>Theme</label>
            <select className={Classes.picker} onChange={getTheme}>
                <option>Dark</option>
                <option>Light</option>
            </select>
        </div>
    )
}
