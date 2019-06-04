import React,{Component,createContext,Fragment} from 'react';
import {Axios_delete,Axios_post}  from '../../api/server';

import { color16 } from '../../utils/utils';

import { Table, Input, Button, Popconfirm,PageHeader, Form ,message as Message,Icon} from 'antd';



const EditableContext = createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr{...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
        if (editing) {
            this.input.focus();
        }
        });
    };
//提交保存的tag，并添加到当前state
    save = e => {
        const { record, handleSave,handleDelete} = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return ;
            };
            // console.log(record.tag_name===values.tag_name);
            //不更改不提交
            if (record.tag_name===values.tag_name && (values.tag_name !== "请编辑这里添加")) {
                return this.toggleEdit();
            };
            //不提交默认内容
            if(values.tag_name === "请编辑这里添加"){
                handleDelete(record,false);
                return this.toggleEdit();
            }else{
                this.toggleEdit();
                const callback = (that,res)=>{
                const {message,status} = res;
                if (status===200){
                    Message.success(message,1);
                    console.log(res);
                    handleSave({ ...record, ...res.data });
                };
                if(message!=="suc"&&status!==0){
                    Message.error(message,1);
                };
                if(status===0){
                    Message.error('连接服务器失败');
                };
                }
                Axios_post('/admin/add/tags',values,this,callback);
            }
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;

        return editing ? (
        <Form.Item style={{ margin: 0 }}>
            {form.getFieldDecorator(dataIndex, {
            rules: [
                {
                required: true,
                message: `${title} is required.`,
                },
            ],
            initialValue: record[dataIndex],
            })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
        </Form.Item>
        ) : (
        <div
            className="editable-cell-value-wrap"
            style={{ paddingRight: 24 }}
            onClick={this.toggleEdit}
        >
            {children}
        </div>
        );
    };

    render() {
        const {editable,dataIndex,title,record,index,handleSave,handleDelete,children,...restProps} = this.props;
        return (
        <td {...restProps}>
            {editable ? (
            <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
            ) : (
            children
            )}
        </td>
        );
    }
}

class TagsTable extends Component {

    constructor(props) {
        super(props);
        this.columns = [
        {
            title: '标签名',
            dataIndex: 'tag_name',
            width: '40%',
            editable: true,
            render:(text) =>{
                const _color = color16(); 
                return (
                    <span style={{
                        marginLeft:'auto',
                        marginRight:'auto',
                        backgroundColor:`${_color}`,
                        color:'#000',
                        fontSize:18}}>
                        {text}
                    </span>
                )
            }
        },
        {
            title: '添加时间',
            dataIndex: 'add_time',
            width: '40%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) =>
            this.state.dataSource.length >= 1 && record.add_time!=='' ? (
                <Popconfirm 
                    title="确定删除?" 
                    onConfirm={() => {
                        this.handleDelete(record,true);
                    }}>
                    <Button type='danger'>Delete</Button>
                </Popconfirm>
            ) : null,
        },
        ];
        let key;
        if( props.tags_data.length>1){
            let {[ props.tags_data.length - 1] : {num}} =  props.tags_data;
            key=num+1;
        }
        this.state = {
            dataSource: props.tags_data,
            count: key,
        };
    }

    handleDelete = (record,bool) => {
        const dataSource = [...this.state.dataSource];
        const {tag_name}=record;
        const callback = (that,res)=>{
            const {message,status} = res;
            if (status===200){
                Message.success(message,1);
                this.setState({ 
                    dataSource: dataSource.filter(item => item.tag_name !== tag_name) 
                });
            };
            if(message!=="suc"&&status!==0){
                Message.error(message,1);
            };
            if(status===0){
                Message.error('连接服务器失败');
            };
        }
        // console.log(record);
        if(bool){
                const url =`/admin/delete/tags/${record.num}`;
                Axios_delete(url,{},this,callback);
        }else{
            this.setState({ 
                dataSource: dataSource.filter(item => item.tag_name !== tag_name) 
            });
        }
    };

    handleAdd = () => {
        const {count, dataSource } = this.state;
        const newData = {
            num: count,
            tag_name: `请编辑这里添加`,
            add_time:'',
        };
        if(dataSource){
            this.setState({
                dataSource: [...dataSource, newData],
                count:count+1,
            });
        }else{
            this.setState({
                dataSource: [newData],
                count:count+1,
            });
        }
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.tag_name+item.num);
        const item = newData[index];
        newData.splice(index, 1, {
        ...item,
        ...row,
        });
        console.log(newData);
        this.setState({ dataSource: newData });
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                    handleDelete:this.handleDelete,
                }),
            };
        });
    return (
        <Fragment>
            { (this.state.dataSource.length<1&&this.props.message ==="error") ?
            <p>还没有一个标签请添加</p>:
            <PageHeader onBack={() =>this.props.history.push('/admin')} title="Tags" subTitle="所有标签页" />}
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                rowKey={record => record.tag_name+record.num}
                title={
                    ()=>(
                    <Button 
                        onClick={this.handleAdd}  
                        style={{ marginBottom: 16}}>
                        <Icon type="plus-circle" />添加一个标签
                    </Button>)
                }
            />
        </Fragment>
    );
}
}
export default TagsTable;
