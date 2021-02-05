<template>
  <div class="operations">
    <Navbar/>
    <div class="page-container">
      <PageTemplate :pageInfo="pageInfo"/>
      <!-- table, may add scrollbar/overflow if too tight -->
      <v-data-table
        :headers="this.headers"
        :items="this.componentData"
        :search="search"
        sort-by="date_received"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title id="table_title">{{tableTitle}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              id="table_search_bar"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <!-- add item dialog -->
            <v-dialog
              v-model="showAddItemDialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
              <v-col class="text-right pr-0">
                <v-btn
                  id="add_item_btn"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Add item
                </v-btn>
              </v-col>
              </template>
              <v-card>
                <v-card-title>
                  <span id="add_item_title" class="headline">Add item to inventory</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="addItemForm">
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            label="Serial Code"
                            v-model="editedItem.serial_id"
                            :rules="[ serial_id_validation ]"
                            required
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            label="Supplier"
                            :items="suppliersList"
                            v-model="editedItem.supplier"
                            :rules="rules.supplier"
                            required
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Product Title"
                            v-model="editedItem.product_title"
                            :rules="rules.product_title"
                            required
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">
                          <v-text-field
                            label="Product Code"
                            v-model="editedItem.product_code"
                            :rules="rules.product_code"
                            required
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-select
                            label="Product Type"
                            v-model="editedItem.product_type"
                            :items="productTypes"
                            :rules="rules.product_type"
                            required
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            label="Dosage"
                            v-model="editedItem.dosage"
                            :rules="rules.dosage"
                            required
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-menu
                            ref="menu_date_received"
                            v-model="add_menu_date_received"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.received_date"
                                label="Date Received"
                                hint="YYYY/MM/DD format"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="date = parseDate(dateFormatted)"
                                v-on="on"
                                :rules="rules.received_date"
                                required
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.received_date"
                              no-title
                              @input="add_menu_date_received = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="6">
                          <v-menu
                            ref="menu_date_expired"
                            v-model="add_menu_date_exp"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.expiration_date"
                                label="Expiration Date"
                                hint="YYYY/MM/DD format"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="date = parseDate(dateFormatted)"
                                v-on="on"
                                required
                                :rules="rules.expiration_date"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.expiration_date"
                              no-title
                              @input="add_menu_date_exp = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3">
                          <v-text-field
                            label="Stock Quantity"
                            v-model="editedItem.stock_quantity"
                            type="number"
                            :rules="rules.stock_quantity"
                            required
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            label="Critical Volume"
                            v-model="editedItem.critical_volume"
                            type="number"
                            required
                            :rules="rules.critical_volume"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            label="Unit"
                            v-model="editedItem.unit"
                            :rules="rules.unit"
                            required
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            label="Packaging"
                            v-model="editedItem.packaging"
                            :rules="rules.packaging"
                            required
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  id="add_item_btn_close"
                  color="blue darken-1"
                  text
                  @click="showAddItemDialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  id="add_item_btn_submit"
                  color="blue darken-1"
                  text
                  @click="submit()"
                >
                  Add Item
                </v-btn>
              </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.received_date`]="{ item }">
          {{convertDate(item.received_date)}}
        </template>
        <template v-slot:[`item.expiration_date`]="{ item }">
          {{convertDate(item.expiration_date)}}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <v-list>
              <v-list-item
              >
                <!-- edit item dialog -->
                <v-dialog
                id="editForm"
                v-model="showEditDialog"
                max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      id="edit_item_btn"
                      v-bind="attrs"
                      v-on="on"
                      @click="editItem(item)"
                    >
                      Edit/Update
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span id="edit_item_title" class="headline">Edit Item</span>
                    </v-card-title>
                    <v-card-text>
                      <v-form ref="editItemForm">
                        <v-container>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                label="Serial Code"
                                v-model="editedItem.serial_id"
                                :rules="[ serial_id_validation ]"
                                required
                              />
                            </v-col>
                            <v-col cols="6">
                              <v-select
                                label="Supplier"
                                :items="suppliersList"
                                v-model="editedItem.supplier"
                                readonly
                                :rules="rules.supplier"
                                required
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="Product Title"
                                v-model="editedItem.product_title"
                                readonly
                                :rules="rules.product_title"
                                required
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="4">
                              <v-text-field
                                label="Product Code"
                                v-model="editedItem.product_code"
                                :rules="rules.product_code"
                                required
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-select
                                label="Product Type"
                                v-model="editedItem.product_type"
                                :items="productTypes"
                                readonly
                                :rules="rules.product_type"
                                required
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                label="Dosage"
                                v-model="editedItem.dosage"
                                :rules="rules.dosage"
                                required
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6">
                              <v-menu
                                ref="menu_date_received"
                                v-model="edit_menu_date_received"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                                readonly
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="editedItem.received_date"
                                    label="Date Received"
                                    hint="YYYY/MM/DD format"
                                    persistent-hint
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    @blur="date = parseDate(dateFormatted)"
                                    v-on="on"
                                    required
                                    readonly
                                    :rules="rules.received_date"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedItem.received_date"
                                  no-title
                                  @input="edit_menu_date_received = false"
                                  readonly
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="6">
                              <v-menu
                                ref="menu_date_expired"
                                v-model="edit_menu_date_exp"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="editedItem.expiration_date"
                                    label="Expiration Date"
                                    hint="YYYY/MM/DD format"
                                    persistent-hint
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    @blur="date = parseDate(dateFormatted)"
                                    v-on="on"
                                    required
                                    :rules="rules.expiration_date"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedItem.expiration_date"
                                  no-title
                                  @input="edit_menu_date_exp = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="3">
                              <v-text-field
                                label="Stock Quantity"
                                v-model="editedItem.stock_quantity"
                                type="number"
                                readonly
                                :rules="rules.stock_quantity"
                                required
                              />
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                label="Critical Volume"
                                v-model="editedItem.critical_volume"
                                type="number"
                                readonly
                                :rules="rules.critical_volume"
                                requied
                              />
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                label="Unit"
                                v-model="editedItem.unit"
                                :rules="rules.unit"
                                required
                              />
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                label="Packaging"
                                v-model="editedItem.packaging"
                                :rules="rules.packaging"
                                required
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      id="edit_item_btn_close"
                      color="blue darken-1"
                      text
                      @click="showEditDialog=false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                      id="edit_item_btn_submit"
                      color="blue darken-1"
                      text
                      @click="submit()"
                      >
                        Save Changes
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item>
              <v-list-item
              >
                <!-- add batch dialog -->
                <v-dialog
                id="addBatchForm"
                v-model="showAddBatchDialog"
                max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      id="add_batch_btn"
                      v-bind="attrs"
                      v-on="on"
                      @click="addNewBatch(item)"
                    >
                      Add New Batch
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span id="add_batch_title" class="headline">Add New Batch of Item</span>
                    </v-card-title>
                    <v-card-text>
                      <v-form ref="addBatchForm">
                        <v-container>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                label="Serial Code"
                                v-model="editedItem.serial_id"
                                required
                                :rules="[ serial_id_validation ]"
                              />
                            </v-col>
                            <v-col cols="6">
                              <v-select
                                label="Supplier"
                                :items="suppliersList"
                                v-model="editedItem.supplier"
                                readonly
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="Product Title"
                                v-model="editedItem.product_title"
                                readonly
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="4">
                              <v-text-field
                                label="Product Code"
                                v-model="editedItem.product_code"
                                required
                                :rules="rules.product_code"
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-select
                                label="Product Type"
                                v-model="editedItem.product_type"
                                :items="productTypes"
                                readonly
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                label="Dosage"
                                v-model="editedItem.dosage"
                                :rules="rules.dosage"
                                required
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6">
                              <v-menu
                                ref="menu_date_received"
                                v-model="batch_menu_date_received"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="editedItem.received_date"
                                    label="Date Received"
                                    hint="YYYY/MM/DD format"
                                    persistent-hint
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    @blur="date = parseDate(dateFormatted)"
                                    v-on="on"
                                    required
                                    :rules="rules.received_date"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedItem.received_date"
                                  no-title
                                  @input="batch_menu_date_received = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="6">
                              <v-menu
                                ref="menu_date_expired"
                                v-model="batch_menu_date_exp"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="editedItem.expiration_date"
                                    label="Expiration Date"
                                    hint="YYYY/MM/DD format"
                                    persistent-hint
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    @blur="date = parseDate(dateFormatted)"
                                    v-on="on"
                                    required
                                    :rules="rules.expiration_date"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedItem.expiration_date"
                                  no-title
                                  @input="batch_menu_date_exp = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="3">
                              <v-text-field
                                label="Stock Quantity"
                                v-model="editedItem.stock_quantity"
                                type="number"
                                required
                                :rules="rules.stock_quantity"
                              />
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                label="Critical Volume"
                                v-model="editedItem.critical_volume"
                                type="number"
                                required
                                :rules="rules.critical_volume"
                              />
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                label="Unit"
                                v-model="editedItem.unit"
                                required
                                :rules="rules.unit"
                              />
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                label="Packaging"
                                v-model="editedItem.packaging"
                                required
                                :rules="rules.packaging"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      id="add_batch_btn_close"
                      color="blue darken-1"
                      text
                      @click="showAddBatchDialog=false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                      id="add_batch_btn_submit"
                      color="blue darken-1"
                      text
                      @click="submit()"
                      >
                        Add Batch
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item>
              <v-list-item
              >
                <!-- pull out dialog -->
                <v-dialog
                id="pullOutForm"
                v-model="showPullOutDialog"
                max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      id="pull_out_item_btn"
                      v-bind="attrs"
                      v-on="on"
                      @click="pullItemOut(item)"
                    >
                      Pull Out
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span id="pull_out_title" class="headline">Pull Item Out to Operations</span>
                    </v-card-title>
                    <v-card-text>
                      <v-form ref="pullOutForm">
                        <v-container>
                          <v-row>Pulling out item:
                          </v-row>
                          <v-row>
                            <v-col cols="4">
                              <v-text-field
                                label="Serial Code"
                                v-model="editedItem.serial_id"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                label="Product Code"
                                v-model="editedItem.product_code"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                label="Product Type"
                                v-model="editedItem.product_type"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="Product Title"
                                v-model="editedItem.product_title"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="pull_out_quantity"
                                label="Pull Out Quantity"
                                type="number"
                                required
                                :rules="rules.pull_out_quantity"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      id="pull_out_item_btn_close"
                      color="blue darken-1"
                      text
                      @click="showPullOutDialog=false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                      id="pull_out_item_btn_submit"
                      color="blue darken-1"
                      text
                      @click="submit()"
                      >
                        Pull Out
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item>
              <v-list-item
              >
                <!-- liquidate dialog -->
                <v-dialog
                id="liquidateForm"
                v-model="showLiquidateDialog"
                max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      id="liquidate_item_btn"
                      v-bind="attrs"
                      v-on="on"
                      @click="liquidateItem(item)"
                    >
                      Liquidate
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span id="liquidate_title" class="headline">Liquidate Item</span>
                    </v-card-title>
                    <v-card-text>
                      <v-form ref="liquidateItemForm">
                        <v-container>
                          <v-row>Liquidating item:
                          </v-row>
                          <v-row>
                            <v-col cols="4">
                              <v-text-field
                                label="Serial Code"
                                v-model="editedItem.serial_id"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                label="Product Code"
                                v-model="editedItem.product_code"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                label="Product Type"
                                v-model="editedItem.product_type"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="Product Title"
                                v-model="editedItem.product_title"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="liquidate_quantity"
                                label="Liquidate Quantity"
                                type="number"
                                required
                                :rules="rules.liquidate_quantity"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      id="liquidate_item_btn_close"
                      color="blue darken-1"
                      text
                      @click="showLiquidateDialog=false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                      id="liquidate_item_btn_submit"
                      color="blue darken-1"
                      text
                      @click="submit()"
                      >
                        Liquidate
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:no-data>
          <v-btn
            id="empty_reset_btn"
            color="primary"
            @click="close"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-footer id="footer">
    </v-footer>
  </div>
</template>

<script>
import PageTemplate from '@/components/PageTemplate.vue';
import Navbar from '@/components/layout/Navbar.vue';
import axios from 'axios';

const url = process.env.VUE_APP_API_URL;

export default {
  components: {
    PageTemplate,
    Navbar,
  },
  data: () => ({
    pageInfo: {
      title: 'Warehouse',
      description: 'Track inventory of warehouse here. This page contains general information about all items within the farm.',
    },
    search: '',
    tableTitle: 'Inventory',
    showAddItemDialog: false,
    showEditDialog: false,
    showAddBatchDialog: false,
    showPullOutDialog: false,
    showLiquidateDialog: false,
    dialogDelete: false,
    componentData: [],
    suppliersList: [],
    productTypes: ['Vaccine', 'Item', 'Egg'],
    headers: [
      { text: 'Serial Id', value: 'serial_id' },
      { text: 'Supplier', value: 'supplier' },
      { text: 'product title', value: 'product_title' },
      { text: 'Product Type', value: 'product_type' },
      { text: 'Product Code', value: 'product_code' },
      { text: 'Dosage', value: 'dosage' },
      { text: 'Received Date', value: 'received_date' },
      { text: 'Expiration Date', value: 'expiration_date' },
      { text: 'Stock Quantity', value: 'stock_quantity' },
      { text: 'Critical Volume', value: 'critical_volume' },
      { text: 'Unit', value: 'unit' },
      { text: 'Packaging', value: 'packaging' },
      { text: 'Batch Number', value: 'batch_number' },
      { text: 'Batch Status', value: 'batch_status' },
      { text: 'Product Status', value: 'product_status' },
      { text: 'Pulled Out Quantity', value: 'pulled_out_quantity' },
      { text: 'Liquidated Quantity', value: 'liquidated_quantity' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    select_options_status: ['In Stock', 'Out of Stock', 'Pulled Out', 'Liquidated'],
    editedItem: {
      serial_id: '',
      supplier: '',
      product_title: '',
      product_code: '',
      product_type: '',
      dosage: '',
      received_date: new Date().toISOString().substr(0, 10),
      expiration_date: new Date().toISOString().substr(0, 10),
      stock_quantity: 0,
      critical_volume: 0,
      unit: '',
      packaging: '',
      batch_number: 1,
      batch_status: 'Current',
      product_status: 'In Stock',
      pulled_out_quantity: 0,
      liquidated_quantity: 0,
    },
    defaultItem: {
      serial_id: '',
      supplier: '',
      product_title: '',
      product_code: '',
      product_type: '',
      dosage: '',
      received_date: new Date().toISOString().substr(0, 10),
      expiration_date: new Date().toISOString().substr(0, 10),
      stock_quantity: 0,
      critical_volume: 0,
      unit: '',
      packaging: '',
      batch_number: 1,
      batch_status: 'Current',
      product_status: 'In Stock',
      pulled_out_quantity: 0,
      liquidated_quantity: 0,
    },
    rules: { // for clarity's sake, using same variable names
      /* eslint arrow-parens: 0 */
      serial_id: [
        val => (val || '').length > 0 || 'This field is required',
        val => val || this.serial_id_is_unique || 'Serial ID already exists'],
      supplier: [val => (val || '').length > 0 || 'This field is required'],
      product_title: [val => (val || '').length > 0 || 'This field is required'],
      product_code: [val => (val || '').length > 0 || 'This field is required'],
      product_type: [val => (val || '').length > 0 || 'This field is required'],
      dosage: [val => (val || '').length > 0 || 'This field is required'],
      received_date: [val => (val || '').length > 0 || 'This field is required'],
      expiration_date: [val => (val || '').length > 0 || 'This field is required'],
      stock_quantity: [
        val => !!val || 'This field is required',
        val => /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(val) || 'Must be a valid number'],
      critical_volume: [
        val => !!val || 'This field is required',
        val => /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(val) || 'Integer or float must be valid.'],
      unit: [val => (val || '').length > 0 || 'This field is required'],
      packaging: [val => (val || '').length > 0 || 'This field is required'],
      pull_out_quantity: [
        val => !!val || 'This field is required',
        val => /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(val) || 'Integer or float must be valid.'],
      liquidate_quantity: [
        val => !!val || 'This field is required',
        val => /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/.test(val) || 'Integer or float must be valid.'],
    },
    serial_id_list: [],
    date: new Date().toISOString().substr(0, 10),
    add_menu_date_exp: false,
    add_menu_date_received: false,
    edit_menu_date_exp: false,
    edit_menu_date_received: false,
    batch_menu_date_exp: false,
    batch_menu_date_received: false,
    pull_out_quantity: 0,
    liquidate_quantity: 0,
    prevSerialID: '',
  }),
  watch: {
    showAddItemDialog(val) {
      if (!val) {
        this.$refs.addItemForm.reset();
      }
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    showEditDialog(val) {
      if (!val) {
        this.$refs.editItemForm.reset();
      }
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    showAddBatchDialog(val) {
      if (!val) {
        this.$refs.addBatchForm.reset();
      }
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    showPullOutDialog(val) {
      if (!val) {
        this.$refs.pullOutForm.reset();
      }
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    showLiquidateDialog(val) {
      if (!val) {
        this.$refs.liquidateItemForm.reset();
      }
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
  },

  async mounted() {
    const response = await axios.get(`${url}/warehouse/`);
    this.componentData = response.data;
    console.log(this.componentData);
    const suppliers = await axios.get(`${url}/suppliers/`);
    // eslint-disable-next-line arrow-parens
    suppliers.data.forEach(supplier => this.suppliersList.push(supplier.supplier_name));
    // eslint-disable-next-line arrow-parens
    this.componentData.forEach(data => this.serial_id_list.push(data.serial_id));
  },

  methods: {
    /*
      For proper date formatting within the table
    */
    convertDate(date) {
      return new Date(date).toISOString().substr(0, 10);
    },
    /*
      Closes the dialog and resets editedItem
      to defaultItem. Also resets editedIndex to -1.
    */
    close() {
      if (this.showAddItemDialog) {
        this.$refs.addItemForm.reset();
        this.showAddItemDialog = false;
      }
      if (this.showEditDialog) {
        this.$refs.editItemForm.reset();
        this.showEditDialog = false;
      }
      if (this.showAddBatchDialog) {
        this.$refs.addBatchForm.reset();
        this.showAddBatchDialog = false;
      }
      if (this.showPullOutDialog) {
        this.$refs.pullOutForm.reset();
        this.showPullOutDialog = false;
      }
      if (this.showLiquidateDialog) {
        this.$refs.liquidateItemForm.reset();
        this.showLiquidateDialog = false;
      }
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
    /*
      For initializing the forms
      mainly for reducing code clutter
    */
    initializeForms(item) {
      // get index of item
      this.editedIndex = this.componentData.indexOf(item);
      // assign item to editedItem obj
      this.editedItem = { ...item };
      // format string to date
      let tempDate = new Date(this.editedItem.expiration_date).toISOString().substr(0, 10);
      this.editedItem.expiration_date = tempDate;
      tempDate = new Date(this.editedItem.received_date).toISOString().substr(0, 10);
      this.editedItem.received_date = tempDate;
    },
    /*
      For validation/rules for Serial_ID
      Checks whether if it's not empty and it's unique
    */
    serial_id_validation(value) {
      if (this.showAddItemDialog || this.showEditDialog || this.showAddBatchDialog) {
        if (value.length === 0) {
          return 'This field is required';
        } if (this.serial_id_list.includes(value)) {
          return 'Serial ID already exists';
        }
      }
      // eslint-disable-next-line no-else-return
      return true;
    },
    /*
      Copies the data to editedItem to display on dialog.
      showDialog triggers the dialog view of the form.
    */
    editItem(item) {
      console.log('Editing item!');
      console.log(item);
      this.initializeForms(item);
    },
    /*
      For adding a new batch to warehouse
    */
    addNewBatch(item) {
      console.log('Adding new batch!');
      console.log(item);
      this.initializeForms(item);
      this.prevSerialID = this.editedItem.serial_id;
      this.editedItem.serial_id = '';
      this.editedItem.product_code = '';
      this.editedItem.received_date = '';
      this.editedItem.expiration_date = '';
    },
    /*
      For pulling out item into operations
      creates Operations item
    */
    pullItemOut(item) {
      console.log('Pulling out!');
      console.log(item);
      this.initializeForms(item);
      this.pull_out_quantity = 0;
    },
    /*
      For item liquidation
    */
    liquidateItem(item) {
      console.log('Liquidating!');
      console.log(item);
      this.initializeForms(item);
    },
    /*
      Pushes editItem back into database, either creating new or updating

      TODO: Operations stuff
    */
    async submit() {
      if (this.showAddItemDialog) {
        if (this.$refs.addItemForm.validate()) {
          /*
            Code segment for adding new warehouse batch/item
          */
          console.log('Adding new item to database!');
          const response = await axios.post(`${url}/warehouse/`, this.editedItem);
          this.componentData.push(response.data);
          this.serial_id_list.push(this.editedItem.serial_id);
          this.close();
        }
      } else if (this.showEditDialog) {
        if (this.$refs.editItemForm.validate()) {
          /*
            Code segment for editing existing warehouse item
          */
          console.log('Updating selected item!');
          /* eslint no-underscore-dangle: 0 */
          /* eslint prefer-template: 0 */
          const param = this.componentData[this.editedIndex]._id;
          const response = await axios.put(`${url}/warehouse/${param}`, this.editedItem);
          Object.assign(this.componentData[this.editedIndex], response.data);
          this.close();
        }
      } else if (this.showAddBatchDialog) {
        if (this.$refs.addBatchForm.validate()) {
          /*
            Code segment for adding new batch from existing item
          */
          console.log('Adding new batch!');
          delete this.editedItem._id;
          delete this.editedItem.__v;
          console.log(this.editedItem);
          // assign current item to temporary
          const tempItem = { ...this.editedItem };
          tempItem.batch_status = 'Old';
          tempItem.serial_id = this.prevSerialID;
          /* eslint no-underscore-dangle: 0 */
          /* eslint prefer-template: 0 */
          const param = this.componentData[this.editedIndex]._id;
          // Add new batch
          console.log('Adding new batch to db!');
          this.editedItem.batch_number += 1;
          this.editedItem.product_status = 'In Stock';
          this.editedItem.pulled_out_quantity = 0;
          this.editedItem.liquidated_quantity = 0;
          this.editedItem.batch_status = (tempItem.batch_status === 'Current') ? 'New' : 'Current';
          const response1 = await axios.post(`${url}/warehouse/`, this.editedItem);
          this.componentData.push(response1.data);
          this.serial_id_list.push(this.editedItem.serial_id);
          // Update old batch
          console.log('Updating previous batch!');
          const response2 = await axios.put(`${url}/warehouse/${param}`, tempItem);
          Object.assign(this.componentData[this.editedIndex], response2.data);
          this.prevSerialID = '';
          this.close();
        }
      } else if (this.showPullOutDialog) {
        if (this.$refs.pullOutForm.validate()) {
          console.log('Pulling item out to operations!');
          /*
            Code segment for pull-out
          */
          /*
            TODO: Query Operations
          */
          const newOperationsItem = { ...this.editedItem };
          delete newOperationsItem.pulled_out_quantity;
          delete newOperationsItem.liquidated_quantity;
          delete newOperationsItem.stock_quantity;
          delete newOperationsItem.critical_volume;
          delete newOperationsItem.batch_status;
          newOperationsItem.quantity = parseInt(this.pull_out_quantity, 10);
          if (newOperationsItem.product_type === 'Item') {
            delete newOperationsItem.dosage;
            newOperationsItem.entry = 'In';
          } else if (newOperationsItem.product_type === 'Vaccine') {
            newOperationsItem.entry = 'In';
          } else if (newOperationsItem.product_type === 'Egg') {
            delete newOperationsItem.dosage;
            newOperationsItem.entry = 'Out';
            newOperationsItem.original_quantity = 0;
            newOperationsItem.eggs_sold_s = 0;
            newOperationsItem.eggs_sold_m = 0;
            newOperationsItem.eggs_sold_l = 0;
          }
          // eslint-disable-next-line no-unused-vars
          const response3 = await axios.post(`${url}/operations/pullOut`, newOperationsItem);
          console.log('Successfully queried Operations!');
          // Update existing warehouse item
          this.editedItem.pulled_out_quantity += parseInt(this.pull_out_quantity, 10);
          this.editedItem.stock_quantity -= parseInt(this.pull_out_quantity, 10);
          const param = this.componentData[this.editedIndex]._id;
          const response2 = await axios.put(`${url}/warehouse/${param}`, this.editedItem);
          Object.assign(this.componentData[this.editedIndex], response2.data);
          this.close();
        }
      } else if (this.showLiquidateDialog) {
        if (this.$refs.liquidateItemForm.validate()) {
          /*
            Code segment for liquidate
          */
          console.log('Liquidating item!');
          this.editedItem.liquidated_quantity += parseInt(this.liquidate_quantity, 10);
          this.editedItem.stock_quantity -= parseInt(this.liquidate_quantity, 10);
          const param = this.componentData[this.editedIndex]._id;
          const response2 = await axios.put(`${url}/warehouse/${param}`, this.editedItem);
          Object.assign(this.componentData[this.editedIndex], response2.data);
          this.close();
        }
      }
    },
  },
};
</script>
