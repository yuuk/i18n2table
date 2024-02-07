import React, { useEffect, useRef } from 'react';
import { isEmpty } from 'lodash-es';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const CustomJSONEditor: React.FC<Props> = (props) => {
    const { value, onChange } = props;
    const containerRef = useRef({} as HTMLDivElement);
    const editorRef = useRef<any>(null);

    useEffect(() => {
        if (containerRef.current && !editorRef.current) {
            const Editor = JSONEditor;
            const editor = new Editor(containerRef.current, {
                mode: 'code',
                onChangeText: onChange,
            });
            editorRef.current = editor;
            !isEmpty(value) && editorRef.current.set(value);
        }
    }, []);

    return <div className='h-full w-full' ref={containerRef} />;
};

export default CustomJSONEditor;
