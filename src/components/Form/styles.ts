import styled from 'styled-components';

export default {
  Form: styled.form`
    .form-group {
      padding-bottom: 25px;
      margin-bottom: 0;
    }

    .form-control {
      font-size: 12px;

      &.is-invalid {
        border-color: #dc3545 !important;
      }
    }
  `,

  Label: styled.label`
    font-size: 12px;
    color: #525964;
  `,

  RequiredAstrick: styled.span`
    color: red;
  `,

  info: styled.p`
    position: absolute;
    color: #dc3545;
    font-size: 11.2px;
    margin-top: 1px;
  `,

  FlowStatus: styled.div`
        pasition: relative;
        padding-left: 30px;
        
        &:before {
            content: ' ',
            border-radius: 50%;
            border: 1px solid;
            color: #1a0df;
            width: 10px;
            position: absolute;
            height: 10px;
            background: #fff;
            left: 0;
            top: 7px;
            z-index: 2;
        }

        &.last {
            &.success-flow,
            &.error-flow,
            &.warning-flow,
            &.disabled-flow{
                &.after {
                    content: none;
                }
            }

        }

        &:not(.last):after {
            content: ' ';
            border-left: 1px dashed;
            color: #dcdcdc;
            position: absolute;
            left: 4px;
            top: 7px;
            bottom: -7px;
            z-index: 1;
        }

        &.success-flow,
            &.error-flow,
            &.warning-flow,
            &.disabled-flow{
                &.before {
                    content: ' ';
                    border-radius: 50%;
                    border: 1px solid;
                    width: 10px;
                    position: absolute;
                    height: 10px;
                    background: #fff;
                    left: 0;
                    top: 7px;
                    z-index: 3;
                }

                &.after {
                    content: ' ';
                    border-left: 1px dashed;
                    position: absolute;
                    left: 4px;
                    top: 7px;
                    bottom: -7px;
                    z-index: 2;
                }
            }

        &.success-flow {
            &:before {
                background: #00b140;
                color: #00b140;
            }

            &:after {
                color: #00b140;
            }
        }

        &.disabled-flow {
            &:before {
                background: #b2b2b2;
                color: #b2b2b2;
            }

            &:after {
                color: #b2b2b2;
            }
        }

        &.error-flow {
            &:before {
                background: red;
                color: red;
            }

            &:after {
                color: red;
            }
        }

         &.warning-flow {
            &:before {
                background: orange;
                color: orange;
            }

            &:after {
                color: orange;
            }
        }
    `,

  FieldCount: styled.span`
    font-size: 10px;
    color: #525964;
    float: right;
    margin-top: 4px;
  `,

  CheckboxWrapper: styled.span`
    margin-top: -2px;
    margin-right: 10px;
    position: static;

    input {
      &:checked ~ label {
        border-color: transprarent;
        background: #003da5;

        &:after {
          opacity: 1;
          transform: rotate(45deg) scale(1);
        }
      }
    }

    label {
      width: 12.6px;
      height: 12.6px;
      border: 1px solid #2f3540;
      border-radius: 2px;
      margin-bottom: 0;
      position: relative;
      vertical-align: middle;
      cursor: pointer;

      &:after {
        content: ' ';
        position: absolute;
        left: 3.5px;
        width: 4px;
        height: 9px;
        opacity: 0;
        transform: rotate(45deg) scale(0);
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        transition: all 0.1s ease;
      }
    }
  `,

  ImageUploadWrapper: styled.div`
    border: 1.5px dashed #003da6;
    color: #003da6;
    background: #d2e0ff;
    cursor: pointer;
    text-align: center;
    padding: 15px 50px;
    text-transform: uppercase;
  `,

  ImageFileName: styled.p`
    font-size: 12px;
  `,

  ImageLoading: styled.span`
    margin-top: 2px;
    width: 16px;
    height: 16px;
    color: #003da5;
    border: 2px solid;
    border-right: 2px solid transparent;
  `,

  ImageView: styled.span`
    color: #003da5;
    font-size: 11px;
    text-align: left;
    cursor: pointer;
  `,

  ImageDelete: styled.span`
    color: #003da5;
    font-size: 11px;
    text-align: right;
    cursor: pointer;
  `,
};
