import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import './ImageUpload.scss';

const CLOUDINARY_UPLOAD_PRESET = 'user_unsigned';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dzssv6mnt/image/upload';

class ImageUpload extends Component {
    constructor(props){
        super(props)
        this.state = {
            uploadedFileCloudinaryUrl: ''
        }
    }

    handleImageUpload = (file) => {
        axios.get('/api/upload').then(response => {
            console.log(response.data.signature)
    
            let formData = new FormData();
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append('file', file[0]);
    
        axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
            console.log(response.data);
    
            this.setState({
                uploadedFileCloudinaryUrl: response.data.secure_url
            })
        }).catch(err => {
            console.log(err);
        })
        })
    }

    render(){

      return(
        <Dropzone 
            multiple={false}
            accept="image/*"
            onDrop={this.handleImageUpload}>
            {
                ({ getRootProps, getInputProps }) => {
                return (
                    <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div>
                        <div>
                        { this.state.uploadedFileCloudinaryUrl ?
                            (
                            <div className="picture">
                                <img className="img-upload" src={this.state.uploadedFileCloudinaryUrl} alt='cloudinary example'/>
                                <p>Edit</p>
                            </div>
                            )
                           :
                           (
                               
                               <p className="picture">Upload</p>
                           )

                        }
                        </div>
                    </div>
                    </div>
                )
                }
            }
            
        </Dropzone>

     
        )
    }
}


export default ImageUpload
