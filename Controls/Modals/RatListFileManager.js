import React from 'react';
import { isNullOrUndefined } from 'util';


class RatListFileManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayFiles: props.arrayFiles,
            path: props.path
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            arrayFiles: newProps.arrayFiles,
            path: newProps.path
        });
    }

    open_folder(nameFolder){
        if(nameFolder != ''){
            let path =  this.state.path;
            if(path.toString().slice(-1) == '/'){
                path = path.substring(0, path.length - 1);
            }
            this.props.callback('open_folder',path + '/' + nameFolder);
        }
    }

    back_open_folder(){
            let path =  this.state.path;
            if(path.toString().slice(-1) == '/'){
                path = path.substring(0, path.length - 1);
            }
            if(path.indexOf('/') != -1){
                let arrayPath = path.split("/");
                path = arrayPath.slice(0, arrayPath.length-1).join("/");
                this.props.callback('open_folder',path);
            }
    }


    uploadind_file(file){
        if(file != ''){
            let path =  this.state.path;
            if(path.toString().slice(-1) == '/'){
                path = path.substring(0, path.length - 1);
            }
            this.props.callback('uploadind_file',path + '/' + file);
        }
    }
    

    render() {
            let json = '';
            let jsonFolders = '';
            let jsonFiles = '';
            try{
                json = JSON.parse(this.state.arrayFiles);
                jsonFolders = JSON.parse(new Buffer(json['folders'],'base64').toString('utf-8'));
                jsonFiles = JSON.parse(new Buffer(json['files'],'base64').toString('utf-8'));
            }catch(err){}

           
            let arrayFolders =[];
            let k_i = 0;
            for(let k in jsonFolders) {
                arrayFolders[k_i] = jsonFolders[k];
                k_i++;
            }
            let arrayFiles =[];
            k_i = 0;
            for(let k in jsonFiles) {
                arrayFiles[k_i] = '[typefile]' + jsonFiles[k];
                k_i++;
            }
            let arrayFileManager = arrayFolders.concat(arrayFiles);

            let linksHtml = [];
            
            arrayFileManager.forEach(function(lnk) {
                if(lnk.length > 0) {

                    let span_onclick = this.uploadind_file.bind(this,lnk);
                   
                    let icon = '';
                    let lnk_icon = lnk.toLowerCase();

                    if(lnk_icon.indexOf('[typefile]') != -1){
                        if((lnk_icon.indexOf('.xlsx') != -1) ||(lnk_icon.indexOf('.xlsm') != -1)||(lnk_icon.indexOf('.xlsb') != -1)||(lnk_icon.indexOf('.xltx') != -1)||(lnk_icon.indexOf('.xltm') != -1)||(lnk_icon.indexOf('.xls') != -1)||(lnk_icon.indexOf('.xlt') != -1)||(lnk_icon.indexOf('.xml') != -1)||(lnk_icon.indexOf('.xlam') != -1)||(lnk_icon.indexOf('.xla') != -1)||(lnk_icon.indexOf('.xlw') != -1)||(lnk_icon.indexOf('.xlr') != -1)||(lnk_icon.indexOf('.pdf') != -1)||(lnk_icon.indexOf('.xps') != -1)||(lnk_icon.indexOf('.ods') != -1)||(lnk_icon.indexOf('.dbf') != -1)){
                            icon = 'fas fa-file-excel';
                        }else if((lnk_icon.indexOf('.doc') != -1) ||(lnk_icon.indexOf('.rtf') != -1)){
                            icon = 'fas fa-file-word';
                        }else if((lnk_icon.indexOf('.zip') != -1) ||(lnk_icon.indexOf('.rar') != -1) ||(lnk_icon.indexOf('.tgz') != -1) ||(lnk_icon.indexOf('.tar') != -1) ||(lnk_icon.indexOf('.zipx.sit') != -1) ||(lnk_icon.indexOf('.sitx') != -1)){
                            icon = 'fas fa-file-archive';
                        }else if((lnk_icon.indexOf('.mp3') != -1) ||(lnk_icon.indexOf('.mp2') != -1) ||(lnk_icon.indexOf('.wma') != -1) ||(lnk_icon.indexOf('.cd') != -1) ||(lnk_icon.indexOf('.ac3') != -1) ||(lnk_icon.indexOf('.acc') != -1)||(lnk_icon.indexOf('.ogg') != -1)){
                            icon = 'fas fa-file-audio';
                        }else if((lnk_icon.indexOf('.mpeg-1') != -1) ||(lnk_icon.indexOf('.mpeg-2') != -1) ||(lnk_icon.indexOf('.mpeg-3') != -1) ||(lnk_icon.indexOf('.mpeg-4') != -1) ||(lnk_icon.indexOf('.ac3') != -1) ||(lnk_icon.indexOf('.3gp') != -1)||(lnk_icon.indexOf('.avi') != -1)||(lnk_icon.indexOf('.asf') != -1)||(lnk_icon.indexOf('.flv') != -1)||(lnk_icon.indexOf('.m2ts') != -1)||(lnk_icon.indexOf('.m4v') != -1)||(lnk_icon.indexOf('.mkv') != -1)){
                            icon = 'fas fa-file-video';
                        }else if((lnk_icon.indexOf('.psd') != -1) ||(lnk_icon.indexOf('.tiff') != -1) ||(lnk_icon.indexOf('.bmp') != -1) ||(lnk_icon.indexOf('.jpeg') != -1) ||(lnk_icon.indexOf('.jpg') != -1) ||(lnk_icon.indexOf('.gif') != -1)||(lnk_icon.indexOf('.pict') != -1)||(lnk_icon.indexOf('.ico') != -1)){
                            icon = 'fas fa-file-image';
                        }else{
                            icon = 'fas fa-file';
                        }
                    }else{
                        span_onclick = this.open_folder.bind(this,lnk);
                        icon = 'fas fa-folder-open';
                    }

                    lnk = lnk.replace('[typefile]','');

                    linksHtml.push(<li class="list-group-item-filemanager" >
                    

                    <i class={icon} style={({marginLeft: '5px'})} aria-hidden="true"></i>

                    <span onClick={span_onclick} style={({marginLeft: '8px'})}  class='span_filemanager'>{lnk}</span>
                  
                    </li>);
                }
            }.bind(this));
        
            let backfolder_onclick = this.back_open_folder.bind(this);
      
      

        return(
            <div class='div_filemanager'>
                <span onClick={backfolder_onclick} style={({marginLeft: '18px',marginTop: '6px'})}  class='span_filemanager'><i class="fa fa-reply"></i></span>
                <React.Fragment>
                    <ul class="list-group list-group-flush array_file_manager">
                        {linksHtml}
                    </ul>
                </React.Fragment>
            </div>
        );
    }
}

export default RatListFileManager;