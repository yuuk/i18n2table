import React, { useEffect, useRef } from 'react';
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
            import('jsoneditor').then((module) => {
                const Editor = module.default;
                const editor = new Editor(containerRef.current, {
                    mode: 'code',
                    onChangeText: onChange,
                });
                editorRef.current = editor;
                value && editorRef.current.set(value);
            });
        }
    }, []);

    useEffect(() => {
        if (value && editorRef.current) {
            console.error(value);
            editorRef.current.update(value);
        }
    }, [value]);

    return <div className='h-full w-full' ref={containerRef} />;
};

export default CustomJSONEditor;
