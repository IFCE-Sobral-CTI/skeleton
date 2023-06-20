import { decode } from 'html-entities';
import React, {useState} from 'react';
import { EditorProvider, Editor as Editable, Toolbar, BtnBold, BtnItalic, BtnUnderline, Separator, BtnNumberedList, BtnBulletList } from 'react-simple-wysiwyg';

export default function Editor({ handleChange, value, name }) {
    return (
        // <DefaultEditor name={name} value={value} onChange={handleChange} className={'h-96'} />
        <EditorProvider>
            <Editable value={decode(value)} name={name} onChange={handleChange}>
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                </Toolbar>
            </Editable>
        </EditorProvider>
    );
}
