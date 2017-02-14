import React, { Component } from 'react';


export default class VideoVRstar extends Component {

    componentDidMount(){

        $("#data-table-basic").bootgrid({
            css: {
                icon: 'zmdi icon',
                iconColumns: 'zmdi-view-module',
                iconDown: 'zmdi-expand-more',
                iconRefresh: 'zmdi-refresh',
                iconUp: 'zmdi-expand-less'
            },
        });

        //Selection
        $("#data-table-selection").bootgrid({
            css: {
                icon: 'zmdi icon',
                iconColumns: 'zmdi-view-module',
                iconDown: 'zmdi-expand-more',
                iconRefresh: 'zmdi-refresh',
                iconUp: 'zmdi-expand-less'
            },
            selection: true,
            multiSelect: true,
            rowSelect: true,
            keepSelection: true
        });

        //Command Buttons
        $("#data-table-command").bootgrid({
            css: {
                icon: 'zmdi icon',
                iconColumns: 'zmdi-view-module',
                iconDown: 'zmdi-expand-more',
                iconRefresh: 'zmdi-refresh',
                iconUp: 'zmdi-expand-less'
            },
            formatters: {
                "commands": function(column, row) {
                    return "<button type=\"button\" class=\"btn btn-icon command-edit waves-effect waves-circle\" data-row-id=\"" + row.id + "\"><span class=\"zmdi zmdi-edit\"></span></button> " +
                        "<button type=\"button\" class=\"btn btn-icon command-delete waves-effect waves-circle\" data-row-id=\"" + row.id + "\"><span class=\"zmdi zmdi-delete\"></span></button>";
                }
            }
        });


    }

    render() {
        return (
            <section id="content">
                <div className="container">
                    <div className="c-header">
                        <h2>Data Table</h2>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h2>Basic Example <small>It's just that simple. Turn your simple table into a sophisticated data table and offer your users a nice experience and great features without any effort.</small></h2>
                        </div>

                        <div className="table-responsive">
                            <table id="data-table-basic" className="table table-striped">
                                <thead>
                                <tr>
                                    <th data-column-id="id" data-type="numeric">ID</th>
                                    <th data-column-id="sender">Sender</th>
                                    <th data-column-id="received" data-order="desc">Received</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>10238</td>
                                    <td>eduardo@pingpong.com</td>
                                    <td>14.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10243</td>
                                    <td>eduardo@pingpong.com</td>
                                    <td>19.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10248</td>
                                    <td>eduardo@pingpong.com</td>
                                    <td>24.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10253</td>
                                    <td>eduardo@pingpong.com</td>
                                    <td>29.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10234</td>
                                    <td>lila@google.com</td>
                                    <td>10.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10239</td>
                                    <td>lila@google.com</td>
                                    <td>15.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10244</td>
                                    <td>lila@google.com</td>
                                    <td>20.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10249</td>
                                    <td>lila@google.com</td>
                                    <td>25.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10237</td>
                                    <td>robert@bingo.com</td>
                                    <td>13.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10242</td>
                                    <td>robert@bingo.com</td>
                                    <td>18.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10247</td>
                                    <td>robert@bingo.com</td>
                                    <td>23.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10252</td>
                                    <td>robert@bingo.com</td>
                                    <td>28.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10236</td>
                                    <td>simon@yahoo.com</td>
                                    <td>12.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10241</td>
                                    <td>simon@yahoo.com</td>
                                    <td>17.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10246</td>
                                    <td>simon@yahoo.com</td>
                                    <td>22.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10251</td>
                                    <td>simon@yahoo.com</td>
                                    <td>27.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10235</td>
                                    <td>tim@microsoft.com</td>
                                    <td>11.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10240</td>
                                    <td>tim@microsoft.com</td>
                                    <td>16.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10245</td>
                                    <td>tim@microsoft.com</td>
                                    <td>21.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10250</td>
                                    <td>tim@microsoft.com</td>
                                    <td>26.10.2013</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h2>Selection Example <small>Ensure that the data attribute [data-identifier="true"] is set on one column header.</small></h2>
                        </div>

                        <div className="table-responsive">
                            <table id="data-table-selection" className="table table-striped">
                                <thead>
                                <tr>
                                    <th data-column-id="id" data-type="numeric" data-identifier="true">ID</th>
                                    <th data-column-id="sender">Sender</th>
                                    <th data-column-id="received" data-order="desc">Received</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>10238</td>
                                    <td>eduardo@pingpong.com</td>
                                    <td>14.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10243</td>
                                    <td>eduardo@pingpong.com</td>
                                    <td>19.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10248</td>
                                    <td>eduardo@pingpong.com</td>
                                    <td>24.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10253</td>
                                    <td>eduardo@pingpong.com</td>
                                    <td>29.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10234</td>
                                    <td>lila@google.com</td>
                                    <td>10.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10239</td>
                                    <td>lila@google.com</td>
                                    <td>15.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10244</td>
                                    <td>lila@google.com</td>
                                    <td>20.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10249</td>
                                    <td>lila@google.com</td>
                                    <td>25.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10237</td>
                                    <td>robert@bingo.com</td>
                                    <td>13.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10242</td>
                                    <td>robert@bingo.com</td>
                                    <td>18.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10247</td>
                                    <td>robert@bingo.com</td>
                                    <td>23.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10252</td>
                                    <td>robert@bingo.com</td>
                                    <td>28.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10236</td>
                                    <td>simon@yahoo.com</td>
                                    <td>12.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10241</td>
                                    <td>simon@yahoo.com</td>
                                    <td>17.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10246</td>
                                    <td>simon@yahoo.com</td>
                                    <td>22.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10251</td>
                                    <td>simon@yahoo.com</td>
                                    <td>27.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10235</td>
                                    <td>tim@microsoft.com</td>
                                    <td>11.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10240</td>
                                    <td>tim@microsoft.com</td>
                                    <td>16.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10245</td>
                                    <td>tim@microsoft.com</td>
                                    <td>21.10.2013</td>
                                </tr>
                                <tr>
                                    <td>10250</td>
                                    <td>tim@microsoft.com</td>
                                    <td>26.10.2013</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h2>Selection Example <small>Ensure that the data attribute [data-identifier="true"] is set on one column header.</small></h2>
                        </div>

                        <table id="data-table-command" className="table table-striped table-vmiddle">
                            <thead>
                            <tr>
                                <th data-column-id="id" data-type="numeric">ID</th>
                                <th data-column-id="sender">Sender</th>
                                <th data-column-id="received" data-order="desc">Received</th>
                                <th data-column-id="commands" data-formatter="commands" data-sortable="false">Commands</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>10238</td>
                                <td>eduardo@pingpong.com</td>
                                <td>14.10.2013</td>
                            </tr>
                            <tr>
                                <td>10243</td>
                                <td>eduardo@pingpong.com</td>
                                <td>19.10.2013</td>
                            </tr>
                            <tr>
                                <td>10248</td>
                                <td>eduardo@pingpong.com</td>
                                <td>24.10.2013</td>
                            </tr>
                            <tr>
                                <td>10253</td>
                                <td>eduardo@pingpong.com</td>
                                <td>29.10.2013</td>
                            </tr>
                            <tr>
                                <td>10234</td>
                                <td>lila@google.com</td>
                                <td>10.10.2013</td>
                            </tr>
                            <tr>
                                <td>10239</td>
                                <td>lila@google.com</td>
                                <td>15.10.2013</td>
                            </tr>
                            <tr>
                                <td>10244</td>
                                <td>lila@google.com</td>
                                <td>20.10.2013</td>
                            </tr>
                            <tr>
                                <td>10249</td>
                                <td>lila@google.com</td>
                                <td>25.10.2013</td>
                            </tr>
                            <tr>
                                <td>10237</td>
                                <td>robert@bingo.com</td>
                                <td>13.10.2013</td>
                            </tr>
                            <tr>
                                <td>10242</td>
                                <td>robert@bingo.com</td>
                                <td>18.10.2013</td>
                            </tr>
                            <tr>
                                <td>10247</td>
                                <td>robert@bingo.com</td>
                                <td>23.10.2013</td>
                            </tr>
                            <tr>
                                <td>10252</td>
                                <td>robert@bingo.com</td>
                                <td>28.10.2013</td>
                            </tr>
                            <tr>
                                <td>10236</td>
                                <td>simon@yahoo.com</td>
                                <td>12.10.2013</td>
                            </tr>
                            <tr>
                                <td>10241</td>
                                <td>simon@yahoo.com</td>
                                <td>17.10.2013</td>
                            </tr>
                            <tr>
                                <td>10246</td>
                                <td>simon@yahoo.com</td>
                                <td>22.10.2013</td>
                            </tr>
                            <tr>
                                <td>10251</td>
                                <td>simon@yahoo.com</td>
                                <td>27.10.2013</td>
                            </tr>
                            <tr>
                                <td>10235</td>
                                <td>tim@microsoft.com</td>
                                <td>11.10.2013</td>
                            </tr>
                            <tr>
                                <td>10240</td>
                                <td>tim@microsoft.com</td>
                                <td>16.10.2013</td>
                            </tr>
                            <tr>
                                <td>10245</td>
                                <td>tim@microsoft.com</td>
                                <td>21.10.2013</td>
                            </tr>
                            <tr>
                                <td>10250</td>
                                <td>tim@microsoft.com</td>
                                <td>26.10.2013</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        );
    }
}
