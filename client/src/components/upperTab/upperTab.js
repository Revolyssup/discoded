import React from 'react';
import Classes from './upperTab.module.css';
import EditorSetting from './editorSetting/editorSetting';
import Collaborators from './collaborators/collaborators';
import Button from '../Button/button';

export default function upperTab({ getLanguage, getTheme, click, modal }) {
    return (
        <div className={Classes.tab}>
            <Collaborators modal={modal} />
            <EditorSetting getLanguage={getLanguage} getTheme={getTheme} />
            <Button type='success' name='Build' click={click} />
        </div>
    )
}
