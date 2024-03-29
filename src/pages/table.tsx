import { useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import JSON5 from 'json5';
import { map } from 'lodash-es';
import Split from 'react-split';

const CustomJSONEditor = dynamic(() => import('../components/editor'), { ssr: false });

function getType(obj: any) {
    var type = Object.prototype.toString.call(obj);
    return type.split(' ')[1].replace(']', '').toLowerCase();
}

function jsonFrom(input: string) {
    const content = input.trim();
    if (!content) {
        return;
    }
    let result = null;
    try {
        result = JSON5.parse(content);
    } catch (err) {
        return result;
    }
    return result;
}

function arrayFrom(json: any) {
    const queue = [];
    let next = json;
    while (next !== undefined) {
        if (getType(next) == 'array') {
            if (next.length > 0) {
                var type = getType(next[0]);
                var scalar =
                    type == 'number' || type == 'string' || type == 'boolean' || type == 'null';
                if (!scalar) {
                    return next;
                }
            }
        }
        if (getType(next) == 'object') {
            for (const key in next) {
                queue.push(next[key]);
            }
        }
        next = queue.shift();
    }
    return json;
}

function parseObject(obj: any, path = '') {
    const type = getType(obj);
    const scalar = type == 'number' || type == 'string' || type == 'boolean' || type == 'null';
    if (type == 'array' || type == 'object') {
        let d: any = {};
        for (let i in obj) {
            const newD = parseObject(obj[i], path + i + '.');
            d = Object.assign(d, newD);
        }
        return d;
    } else if (scalar) {
        let d: any = {};
        const endPath = path.substring(0, path.length - 1);
        d[endPath] = obj;
        return d;
    }
    return {};
}

function formatSource(input: string) {
    const json = jsonFrom(input);
    const obj = arrayFrom(json);
    return parseObject(obj);
}

export default function Home() {
    const tableRef = useRef(null);
    const [namespace, setNamespace] = useState('');
    const [source, setSource] = useState('');
    const [output, setOutput] = useState({});
    const [copyResult, setCopyResult] = useState('');

    const handleChange = (input: string) => {
        setSource(input);
        const result = formatSource(input);
        setOutput(result);
    };

    const copyTable = () => {
        if (tableRef.current) {
            try {
                const element = tableRef.current;
                const range = document.createRange();
                const selection = window.getSelection()!;
                range.selectNode(element);
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('copy');
                setCopyResult('复制成功，可以粘贴到Excel文档中！');
            } catch (e) {
                console.error(e);
                setCopyResult('复制失败，请手动复制！');
            }
        }
    };

    useEffect(() => {
        if (copyResult !== '') {
            setTimeout(() => {
                setCopyResult('');
            }, 3000);
        }
    }, [copyResult]);

    return (
        <>
            <Head>
                <title>多语言JSON转表格</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Split className='flex'>
                <div className='h-screen flex flex-col w-1/2'>
                    <div className='py-3'>
                        <input
                            className='block w-full leading-6 text-slate-900 placeholder-slate-400 rounded-md p-2 ring-1 ring-slate-400'
                            type='text'
                            placeholder='输入namespace，namespace会自动拼接到所有key的前面'
                            value={namespace}
                            onChange={(e) => setNamespace(e.target.value)}
                        />
                    </div>
                    <CustomJSONEditor value={jsonFrom(source)} onChange={handleChange} />
                </div>

                <div className='h-screen w-1/2 overflow-y-auto'>
                    <div className='flex items-center py-3'>
                        <button
                            type='button'
                            className='h-10 px-6 font-semibold rounded-md bg-black text-white'
                            onClick={copyTable}
                        >
                            复制表格
                        </button>
                        <div className='pl-2'>{copyResult}</div>
                    </div>
                    <table className='w-full h-auto text-center' ref={tableRef}>
                        <thead>
                            <tr>
                                <th className='w-1/2 border border-slate-300'>key</th>
                                <th className='w-1/2 border border-slate-300'>参考文案</th>
                            </tr>
                        </thead>
                        <tbody>
                            {map(output, (v, k) => {
                                return (
                                    <tr key={k}>
                                        <td className='w-1/2 border border-slate-300'>
                                            {namespace ? `${namespace}.${k}` : k}
                                        </td>
                                        <td className='w-1/2 border border-slate-300'>{v}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Split>
        </>
    );
}
