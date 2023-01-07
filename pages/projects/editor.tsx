import useNavigation from '../../hooks/UseNavigation'
import { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import { parseOrNull } from '../../utils/utils'
import Header, { HeaderStaticContent } from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Editor from '../../components/editor/Editor'
import { EditorData } from '../../typings'

interface Props {
    headerContent: HeaderStaticContent
}

const title = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis culpa cumque deserunt dolore esse iste optio quam sunt totam?'
const sample = 'Lorem `ipsum` dolor sit amet, consectetur adipisicing elit. Beatae corporis culpa cumque deserunt dolore esse iste optio quam sunt totam? Deleniti eaque expedita iure mollitia nihil, numquam optio pariatur unde. Cumque est inventore molestias rerum velit! Earum est, molestias. Beatae debitis harum illum necessitatibus nostrum odit quam quidem sequi similique voluptatum. Ab esse impedit iste iure maiores perspiciatis recusandae temporibus? Ab adipisci dignissimos et excepturi fugit obcaecati officiis pariatur, provident! Et iure natus sapiente? Beatae cumque deleniti earum et fugiat laborum maiores maxime possimus quae quo. Ad aperiam commodi distinctio expedita labore maxime, non, officia officiis, provident sunt temporibus voluptas.'
const url = '/assets/images/sample_programming.jpg'
const tsCode = "var globalVar;\n/**\n * Constructor for AjaxRequest class\n * @param {string} url the url for the request<p/>\n */\nfunction AjaxRequest(url) {\n  function local() {}\n  var urls = [ \"www.cnn.com\", 5, globalVar];\n  this.request = new XMLHttpRequest();\n  url = url.replace(/^\\s*(.*)/, \"$1\"); // skip leading whitespace\n  /* check the url to be in urls */\n  var a = \"\\u1111\\z\\n\\u11\";\n  this.foo = new function() {};\n  foo();\n  #\n  var hello = () => console.log(\"hello\")}\n\n@decorator()\nclass NameClass {\n}\ndeclare module name{\n  declare export var exportedVar: string;\n  declare export function exportedFunction(): void;\n  declare export class ExportedClass {}\n}\ninterface MyInterface { }\ntype FooBarAlias = string;\nvar html =`<div title='HTML injection'>Injected language fragment</div>`;\nvar x: MyInterface, y: string, z: FooBarAlias;"
const cppCode = "#ifndef ARRAY_LIST_H\n#define ARRAY_LIST_H\n\n#include \"Arduino.h\"\n\ntemplate <typename T>\nclass ArrayList\n{\npublic:\n    class iterator\n    {\n    public:\n        iterator(T *ptr) : ptr(ptr) {}\n\n        iterator operator++()\n        {\n            ++ptr;\n            return *this;\n        }\n\n        bool operator!=(const iterator &other) const\n        {\n            return ptr != other.ptr;\n        }\n\n        const T &operator*() const\n        {\n            return *ptr;\n        }\n\n    private:\n        T *ptr;\n    };\n\n    ArrayList()\n        : m_Data(NULL), m_Size(0), m_Capacity(0)\n    {\n        reallocate(2);\n    }\n\n    ArrayList(const ArrayList &other) : ArrayList()\n    {\n        if (reallocate(other.m_Capacity))\n        {\n            m_Size = other.m_Size;\n            const size_t size = m_Size * sizeof(T);\n            memcpy(m_Data, other.m_Data, size);\n        }\n    }\n\n    ArrayList(ArrayList &&other) noexcept : ArrayList()\n    {\n        swap(other);\n    }\n\n    ArrayList(T arr[], size_t len) : m_Data(NULL), m_Size(0), m_Capacity(0)\n    {\n        if (reallocate(len + len / 2))\n        {\n            for (size_t i = 0; i < len; i++)\n            {\n                add(arr[i]);\n            }\n        }\n    }\n\n    ~ArrayList()\n    {\n        deallocate();\n    }\n\n    bool add(const T &element)\n    {\n        if (m_Size >= m_Capacity)\n        {\n            if (!reallocate(m_Capacity + m_Capacity / 2))\n                return false;\n        }\n        m_Data[m_Size] = element;\n        m_Size++;\n        return true;\n    }\n\n    void remove(const T &element)\n    {\n        removeByIndex(indexOf(element));\n    }\n\n    void removeByIndex(size_t index)\n    {\n        if (index < 0)\n            return;\n        m_Data[index].~T();\n        m_Size--;\n        for (size_t i = index; i < m_Size; i++)\n        {\n            m_Data[i] = m_Data[i + 1];\n        }\n    }\n\n    void removeIf(bool (*predicate)(T))\n    {\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            if (predicate(m_Data[i]))\n            {\n                removeByIndex(i);\n                i--;\n            }\n        }\n    }\n\n    bool contains(const T &element)\n    {\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            if (m_Data[i] == element)\n                return true;\n        }\n        return false;\n    }\n\n    bool contains(bool (*predicate)(T))\n    {\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            if (predicate(m_Data[i]))\n                return true;\n        }\n        return false;\n    }\n\n    int indexOf(const T &element)\n    {\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            if (m_Data[i] == element)\n                return i;\n        }\n        return -1;\n    }\n\n    int indexOf(bool (*predicate)(T))\n    {\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            if (predicate(m_Data[i]))\n                return i;\n        }\n        return -1;\n    }\n\n    void clear()\n    {\n        deallocate();\n        reallocate(2);\n    }\n\n    const T &operator[](const size_t &index) const\n    {\n        return m_Data[index];\n    }\n\n    T &operator[](const size_t &index)\n    {\n        return m_Data[index];\n    }\n\n    ArrayList &operator=(const ArrayList &other)\n    {\n        m_Size = 0;\n        if (reallocate(other.m_Capacity))\n        {\n            m_Size = other.m_Size;\n            const size_t size = m_Size * sizeof(T);\n            memcpy(m_Data, other.m_Data, size);\n        }\n        return *this;\n    }\n\n    ArrayList &operator=(ArrayList &&other) noexcept\n    {\n        swap(other);\n        return *this;\n    }\n\n    void forEach(void (*predicate)(T))\n    {\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            predicate(m_Data[i]);\n        }\n    }\n\n    void forEach(void (*predicate)(T &))\n    {\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            predicate(m_Data[i]);\n        }\n    }\n\n    void forEach(void (*predicate)(T, size_t))\n    {\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            predicate(m_Data[i], i);\n        }\n    }\n\n    void forEach(void (*predicate)(T &, size_t))\n    {\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            predicate(m_Data[i], i);\n        }\n    }\n\n    ArrayList map(T (*predicate)(T))\n    {\n        ArrayList buffer;\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            buffer.add(predicate(m_Data[i]));\n        }\n        return buffer;\n    }\n\n    ArrayList map(T (*predicate)(T, size_t))\n    {\n        ArrayList buffer;\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            buffer.add(predicate(m_Data[i], i));\n        }\n        return buffer;\n    }\n\n    ArrayList filter(bool (*predicate)(T))\n    {\n        ArrayList buffer;\n        for (size_t i = 0; i < m_Size; i++)\n        {\n            if (predicate(m_Data[i]))\n                buffer.add(m_Data[i]);\n        }\n        return buffer;\n    }\n\n    void sort(bool (*predicate)(T, T) = [](T a, T b) -> bool\n              { return a > b; })\n    {\n        for (size_t i = 1; i < m_Size; i++)\n        {\n            for (size_t j = i; j > 0 && predicate(m_Data[j - 1], m_Data[j]); j--)\n            {\n                T tmp = m_Data[j - 1];\n                m_Data[j - 1] = m_Data[j];\n                m_Data[j] = tmp;\n            }\n        }\n    }\n\n    void reverse()\n    {\n        for (size_t i = 0; i < m_Size / 2; i++)\n        {\n            T buffer = m_Data[i];\n            m_Data[i] = m_Data[m_Size - 1 - i];\n            m_Data[m_Size - 1 - i] = buffer;\n        }\n    }\n\n    iterator begin() const\n    {\n        return iterator(m_Data);\n    }\n\n    iterator end() const\n    {\n        return iterator(m_Data + m_Size);\n    }\n\n    size_t size()\n    {\n        return m_Size;\n    }\n\nprivate:\n    T *m_Data;\n    size_t m_Size;\n    size_t m_Capacity;\n\n    bool reallocate(size_t newCapacity)\n    {\n        T *newBlock = new T[newCapacity];\n        if (newBlock)\n        {\n            if (newCapacity < m_Size)\n            {\n                m_Size = newCapacity;\n            }\n            for (size_t i = 0; i < m_Size; i++)\n            {\n                newBlock[i] = m_Data[i];\n            }\n            delete[] m_Data;\n            m_Data = newBlock;\n            m_Capacity = newCapacity;\n            return true;\n        }\n        return false;\n    }\n\n    void deallocate()\n    {\n        delete[] m_Data;\n        m_Data = NULL;\n        m_Size = 0;\n        m_Capacity = 0;\n    }\n\n    void swap(ArrayList &other)\n    {\n        T *_data = m_Data;\n        size_t _size = m_Size;\n        size_t _capacity = m_Capacity;\n\n        m_Data = other.m_Data;\n        m_Size = other.m_Size;\n        m_Capacity = other.m_Capacity;\n\n        other.m_Data = _data;\n        other.m_Size = _size;\n        other.m_Capacity = _capacity;\n    }\n};\n\n#endif\n"

const data: EditorData = {
    id: "0",
    url: "",
    type: "project",
    authorId: "",
    title: title,
    description: sample,
    thumbnails: [],
    tags: ['android', 'web', 'arduino'],
    categories: ['android', 'web', 'arduino'],
    dateCreated: new Date(),
    dateModified: new Date(),
    published: false,
    contents: [
        {id: "1", type: "subtitle-1", data: {text: title}},
        {id: "2", type: "subtitle-2", data: {text: title}},
        {id: "3", type: "tips", data: {text: '**NOTE**: Please go to [https://www.google.com](google)'}},
        {id: "4", type: "warning", data: {text: sample}},
        {id: "5", type: "important", data: {text: sample}},
        {id: "6", type: "paragraph", data: {text: sample}},
        {id: "7", type: "list-number", data: [{text: 'Hello'}, {text: 'World'}, {text: title}]},
        {id: "8", type: "list-bullet", data: [{text: 'Hello'}, {text: 'World'}, {text: title}, {text: '[https://www.google.com](Google)'}]},
        {id: "9", type: "image", data: []},
        {id: "a", type: "image", data: [{url, text: 'Description 1'}, {url, text: 'Description 2'}, {url, text: ''}]},
        {id: "b", type: "code-files", data: [{name: 'ArrayList.h', code: cppCode, lang: 'cpp'}, {name: 'Sample.ts', code: 'var globalVar;', lang: 'ts'}, {name: 'Sample2.ts', code: tsCode, lang: 'ts'}, {name: 'Sample3.ts', code: tsCode, lang: 'ts'}, {name: 'Sample4.ts', code: tsCode, lang: 'ts'}]},
        {id: "c", type: "code", data: {code: 'var globalVar; // Skip leading whitespace', lang: 'ts'} },
        {id: "d", type: "code", data: {code: tsCode, lang: 'ts'} },
    ]
}

const ProjectEditor = ({headerContent}: Props) => {
    const {navbarOpen, setNavbarOpen} = useNavigation()

    useEffect(() => {
        setNavbarOpen(false)
    }, [])

    return (
        <div className={`relative w-screen h-screen scrollbar-thin-purple-dark md:!overflow-auto ${navbarOpen && '!overflow-hidden'}`}>
            <Head>
                <title>Codedillo - Create Project</title>
                <link rel="icon" type="image/png" href="/favicon.png"/>
            </Head>
            <Header content={headerContent}/>
            <main className="w-full pb-16 sm:pb-32 max-w-full block scrollbar-thin-purple-dark">
                <Editor className="mt-32" data={data} editable={false} />
            </main>
            <Footer/>
        </div>
    )
}

export const getStaticProps: GetStaticProps<Props> = async ({locale}) => {
    const header = fs.readFileSync(path.join('locales', locale ?? 'en', 'header.json'), 'utf-8')
    const headerProps = parseOrNull(header)

    return {
        props: {
            headerContent: headerProps
        }
    }
}

export default ProjectEditor