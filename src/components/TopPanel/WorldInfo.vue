<!-- WorldInfo.vue -->
<template>
  <div id="WorldInfo" class="drawer-content openDrawer" style="display: block;">
    <div id="WorldInfoheader" class="fa-solid fa-grip drag-grabber"></div>
    <div class="flex-container alignitemscenter gap10px">
      <div id="WI_panel_pin_div" :title="t('pinned_title')">
        <input type="checkbox" id="WI_panel_pin" v-model="isPanelPinned" />
        <label for="WI_panel_pin">
          <div class="unchecked fa-solid fa-unlock" v-if="!isPanelPinned"></div>
          <div class="checked fa-solid fa-lock" v-else></div>
        </label>
      </div>
      <h3 class="margin0">
        <span>{{ t('worlds_and_lorebooks') }}</span>
        <a
          href="https://docs.sillytavern.app/usage/core-concepts/worldinfo/"
          class="notes-link"
          target="_blank"
        >
          <span class="fa-solid fa-circle-question note-link-span"></span>
        </a>
      </h3>
    </div>
    <div id="wi-holder" class="margin5">
      <div id="wiTopBlock" class="flex-container">
        <div
          id="WIMultiSelector"
          class="flex1 flex alignSelfStart range-block"
        >
          <div class="range-block-title justifyLeft">
            <span>
              <small>{{ t('active_worlds') }}</small>
            </span>
          </div>
          <div class="range-block-range">
            <select
              id="world_info"
              class="select2_multi_sameline select2_choice_clickable_buttonstyle"
              multiple
            >
              <!-- Здесь должны быть опции миров -->
              <option v-for="world in worlds" :key="world.id" :value="world.id">
                {{ world.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex1 flex alignSelfStart range-block">
          <div class="range-block-title justifyLeft">
            <small>{{ t('global_activation_settings') }}</small>
          </div>
          <div class="inline-drawer wide100p flexFlowColumn">
            <div
              class="standoutHeader inline-drawer-toggle inline-drawer-header"
              @click="toggleDrawer"
            >
              <b><span>{{ t('click_to_expand') }}</span></b>
              <div
                class="fa-solid inline-drawer-icon interactable"
                :class="{
                  down: !isDrawerOpen,
                  up: isDrawerOpen,
                  'fa-circle-chevron-down': !isDrawerOpen,
                  'fa-circle-chevron-up': isDrawerOpen,
                }"
                tabindex="0"
              ></div>
            </div>
            <div
              class="inline-drawer-content"
              v-show="isDrawerOpen"
            >
              <div id="wiActivationSettings" class="flex-container">
                <div id="wiSliders" class="flex2 flex-container">
                  <!-- Начало слайдеров -->
                  <div
                    class="alignitemscenter flex-container flexFlowColumn flexGrow flexShrink gap0 flexBasis48p"
                  >
                    <small>
                      <span>{{ t('scan_depth') }}</span>
                    </small>
                    <input
                      class="neo-range-slider"
                      type="range"
                      id="world_info_depth"
                      name="world_info_depth"
                      min="0"
                      max="100"
                      step="1"
                      v-model="worldInfoDepth"
                    />
                    <input
                      class="neo-range-input"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      :data-for="world_info_depth"
                      id="world_info_depth_counter"
                      v-model="worldInfoDepth"
                    />
                  </div>

                  <div
                    class="alignitemscenter flex-container flexFlowColumn flexGrow flexShrink gap0 flexBasis48p"
                  >
                    <small>
                      <span>{{ t('context_percent') }}</span>
                    </small>
                    <input
                      class="neo-range-slider"
                      type="range"
                      id="world_info_budget"
                      name="world_info_budget"
                      min="1"
                      max="100"
                      step="1"
                      v-model="worldInfoBudget"
                    />
                    <input
                      class="neo-range-input"
                      type="number"
                      min="1"
                      max="100"
                      step="1"
                      :data-for="world_info_budget"
                      id="world_info_budget_counter"
                      v-model="worldInfoBudget"
                    />
                  </div>

                  <div
                    class="alignitemscenter flex-container flexFlowColumn flexGrow flexShrink gap0 flexBasis48p"
                  >
                    <small>
                      <span>{{ t('budget_cap') }}</span>
                      <div
                        class="fa-solid fa-circle-info opacity50p"
                        :title="t('zero_disabled')"
                      ></div>
                    </small>
                    <input
                      class="neo-range-slider"
                      type="range"
                      id="world_info_budget_cap"
                      name="world_info_budget_cap"
                      min="0"
                      max="8192"
                      step="1"
                      v-model="worldInfoBudgetCap"
                    />
                    <input
                      class="neo-range-input"
                      type="number"
                      min="0"
                      max="8192"
                      step="1"
                      :data-for="world_info_budget_cap"
                      id="world_info_budget_cap_counter"
                      v-model="worldInfoBudgetCap"
                    />
                  </div>

                  <!-- Продолжайте добавлять остальные слайдеры аналогично -->
                </div>
                <div id="wiCheckboxes" class="flex1 flex-container flexFlowColumn">
                  <label
                    class="checkbox-label flex1"
                    :title="t('include_names_tip')"
                  >
                    <input
                      id="world_info_include_names"
                      type="checkbox"
                      v-model="includeNames"
                    />
                    <small class="whitespacenowrap flex1">
                      {{ t('include_names') }}
                    </small>
                  </label>
                  <label
                    class="checkbox-label flex1"
                    :title="t('recursive_scan_tip')"
                  >
                    <input
                      id="world_info_recursive"
                      type="checkbox"
                      v-model="recursiveScan"
                    />
                    <small class="whitespacenowrap flex1">
                      {{ t('recursive_scan') }}
                    </small>
                  </label>
                  <!-- Добавьте остальные чекбоксы аналогично -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="world_popup">
        <hr />
        <div class="flex-container alignitemscenter gap3px">
          <input
            type="file"
            id="world_import_file"
            accept=".json,.lorebook,.png"
            name="avatar"
            hidden
            @change="importWorld"
          />
          <div
            id="world_create_button"
            class="menu_button menu_button_icon interactable"
            tabindex="0"
            @click="createWorld"
          >
            <i class="fa-solid fa-globe"></i>
            <span>{{ t('new') }}</span>
          </div>
          <small>{{ t('or') }}</small>
          <select
            id="world_editor_select"
            class="margin0"
            v-model="selectedWorld"
            @change="editWorld"
          >
            <option value="">{{ t('pick_to_edit') }}</option>
            <option
              v-for="world in worlds"
              :key="world.id"
              :value="world.id"
            >
              {{ world.name }}
            </option>
          </select>
          <div
            id="world_popup_name_button"
            class="menu_button fa-pencil fa-solid interactable"
            :title="t('rename_world_info')"
            tabindex="0"
            @click="renameWorld"
          ></div>
          <div
            id="OpenAllWIEntries"
            class="menu_button fa-solid fa-expand interactable"
            :title="t('open_all_entries')"
            tabindex="0"
            @click="openAllEntries"
          ></div>
          <div
            id="CloseAllWIEntries"
            class="menu_button fa-solid fa-compress interactable"
            :title="t('close_all_entries')"
            tabindex="0"
            @click="closeAllEntries"
          ></div>
          <div
            id="world_popup_new"
            class="menu_button fa-solid fa-plus interactable"
            :title="t('new_entry')"
            tabindex="0"
            @click="createEntry"
          ></div>
          <!-- Добавьте остальные кнопки аналогично -->
          <input
            type="search"
            class="text_pole textarea_compact"
            :placeholder="t('search_placeholder')"
            id="world_info_search"
            v-model="searchQuery"
          />
          <select
            id="world_info_sort_order"
            class="margin0"
            v-model="sortOrder"
            @change="applySortOrder"
          >
            <option
              v-for="option in sortOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ t(option.textKey) }}
            </option>
          </select>
          <div
            id="world_refresh"
            class="menu_button fa-solid fa-arrows-rotate interactable"
            :title="t('refresh')"
            tabindex="0"
            @click="refreshWorlds"
          ></div>
          <!-- Пагинация, если нужна -->
          <div id="world_info_pagination"></div>
        </div>
        <div id="world_popup_entries_list" v-show="showEntriesList">
          <!-- Здесь будет список записей мира -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  useScope: "local",
});

const isPanelPinned = ref(false);
const isDrawerOpen = ref(false);

// Пример данных миров
const worlds = ref([
  // Массив миров
  // { id: 0, name: "Eldoria" },
]);

const selectedWorld = ref("");
const worldInfoDepth = ref(0);
const worldInfoBudget = ref(50);
const worldInfoBudgetCap = ref(0);
const includeNames = ref(false);
const recursiveScan = ref(false);
const searchQuery = ref("");
const sortOrder = ref(0);
const showEntriesList = ref(false);

// Опции сортировки
const sortOptions = [
  { value: 0, textKey: "priority" },
  { value: 1, textKey: "title_az" },
  { value: 2, textKey: "title_za" },
  // Добавьте остальные опции
];

// Методы
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const createWorld = () => {
  // Логика создания мира
};

const editWorld = () => {
  // Логика редактирования мира
};

const renameWorld = () => {
  // Логика переименования мира
};

const openAllEntries = () => {
  // Логика открытия всех записей
};

const closeAllEntries = () => {
  // Логика закрытия всех записей
};

const createEntry = () => {
  // Логика создания новой записи
};

const importWorld = () => {
  // Логика импорта мира
};

const applySortOrder = () => {
  // Логика применения сортировки
};

const refreshWorlds = () => {
  // Логика обновления списка миров
};

// Здесь можно добавить дополнительную логику
</script>

<i18n lang="json">
{
  "en": {
    "pinned_title": "Pinned = World Editor will stay open",
    "worlds_and_lorebooks": "Worlds and Lorebooks",
    "active_worlds": "Active Worlds for all chats",
    "global_activation_settings": "Global World Info/Lorebook activation settings",
    "click_to_expand": "Click to expand",
    "include_names_tip": "Include names with each message into the context for scanning",
    "recursive_scan_tip": "Entries can activate other entries by mentioning their keywords",
    "scan_depth": "Scan Depth",
    "context_percent": "Context %",
    "budget_cap": "Budget Cap",
    "zero_disabled": "(0 = disabled)",
    "min_activations": "Min Activations",
    "max_depth": "Max Depth",
    "zero_unlimited": "(0 = unlimited, use budget)",
    "max_recursion_steps": "Max Recursion Steps",
    "disabled_when_max_recursion": "(disabled when max recursion steps are used)",
    "include_names": "Include Names",
    "recursive_scan": "Recursive Scan",
    "case_sensitive": "Case Sensitive",
    "match_whole_words": "Match Whole Words",
    "use_group_scoring": "Use Group Scoring",
    "alert_on_overflow": "Alert On Overflow",
    "new": "New",
    "or": "or",
    "pick_to_edit": "--- Pick to Edit ---",
    "rename_world_info": "Rename World Info",
    "open_all_entries": "Open all Entries",
    "close_all_entries": "Close all Entries",
    "new_entry": "New Entry",
    "fill_empty_memo": "Fill empty Memo/Titles with Keywords",
    "apply_current_sorting": "Apply current sorting as Order",
    "import_world_info": "Import World Info",
    "export_world_info": "Export World Info",
    "duplicate_world_info": "Duplicate World Info",
    "delete_world_info": "Delete World Info",
    "search_placeholder": "Search...",
    "search": "Search",
    "priority": "Priority",
    "custom": "Custom",
    "title_az": "Title A-Z",
    "title_za": "Title Z-A",
    "tokens_asc": "Tokens ↗",
    "tokens_desc": "Tokens ↘",
    "depth_asc": "Depth ↗",
    "depth_desc": "Depth ↘",
    "order_asc": "Order ↗",
    "order_desc": "Order ↘",
    "uid_asc": "UID ↗",
    "uid_desc": "UID ↘",
    "trigger_percent_asc": "Trigger% ↗",
    "trigger_percent_desc": "Trigger% ↘",
    "refresh": "Refresh"
  },
  "ru": {
    "pinned_title": "Закреплено = Редактор мира останется открытым",
    "worlds_and_lorebooks": "Миры и лорбуки",
    "active_worlds": "Активные миры для всех чатов",
    "global_activation_settings": "Настройки активации глобального лорбука / Информации о мире",
    "click_to_expand": "Щёлкните, чтобы развернуть",
    "include_names_tip": "Добавлять имена с каждым сообщением в контекст для сканирования",
    "recursive_scan_tip": "Записи могут активировать другие записи, упоминая их ключевые слова",
    "scan_depth": "Глубина сканирования",
    "context_percent": "Процент контекста",
    "budget_cap": "Бюджетный лимит",
    "zero_disabled": "(0 = отключено)",
    "min_activations": "Мин. число активаций",
    "max_depth": "Макс. глубина",
    "zero_unlimited": "(0 = безграничная, использовать бюджет)",
    "max_recursion_steps": "Макс. число рекурсий",
    "disabled_when_max_recursion": "(отключено при использовании макс. числа рекурсий)",
    "include_names": "Добавлять имена",
    "recursive_scan": "Рекурсивное сканирование",
    "case_sensitive": "Учитывать регистр",
    "match_whole_words": "Только полное совпадение",
    "use_group_scoring": "Использовать групповой подсчет",
    "alert_on_overflow": "Оповещение о переполнении",
    "new": "Новый",
    "or": "или",
    "pick_to_edit": "--- Выберите для редактирования ---",
    "rename_world_info": "Переименовать мир",
    "open_all_entries": "Открыть все записи",
    "close_all_entries": "Закрыть все записи",
    "new_entry": "Новая запись",
    "fill_empty_memo": "Заполнить пустые Заметки/Названия ключевыми словами",
    "apply_current_sorting": "Применить текущую сортировку как порядок",
    "import_world_info": "Импортировать мир",
    "export_world_info": "Экспортировать мир",
    "duplicate_world_info": "Дублировать мир",
    "delete_world_info": "Удалить мир",
    "search_placeholder": "Поиск...",
    "search": "Поиск",
    "priority": "Приоритет",
    "custom": "Пользовательский",
    "title_az": "Название от A до Z",
    "title_za": "Название от Z до A",
    "tokens_asc": "Токены ↗",
    "tokens_desc": "Токены ↘",
    "depth_asc": "Глубина ↗",
    "depth_desc": "Глубина ↘",
    "order_asc": "Порядок ↗",
    "order_desc": "Порядок ↘",
    "uid_asc": "UID ↗",
    "uid_desc": "UID ↘",
    "trigger_percent_asc": "Триггер% ↗",
    "trigger_percent_desc": "Триггер% ↘",
    "refresh": "Обновить"
  }
}
</i18n>

<style scoped>
.drawer-content {
  padding: 1rem;
}

/* Добавьте остальные стили */
#WorldInfo {
  /* Стили для компонента WorldInfo */
}

.margin0 {
  margin: 0;
}

.margin5 {
  margin: 5px;
}

.gap10px {
  gap: 10px;
}

.gap3px {
  gap: 3px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.alignitemscenter {
  align-items: center;
}

.alignSelfStart {
  align-self: flex-start;
}

.flex1 {
  flex: 1;
}

.flex2 {
  flex: 2;
}

.flexFlowColumn {
  flex-direction: column;
}

.range-block {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin: 0.5rem;
  width: 100%;
}

.range-block-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.inline-drawer {
  width: 100%;
}

.inline-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.inline-drawer-content {
  margin-top: 1rem;
}

.menu_button {
  cursor: pointer;
  padding: 0.5rem;
  margin: 0 0.2rem;
}

.menu_button_icon {
  display: flex;
  align-items: center;
}

.interactable {
  transition: color 0.3s;
}

.interactable:hover {
  color: #007bff;
}

.text_pole {
  padding: 0.5rem;
  margin-left: 0.5rem;
}

.textarea_compact {
  width: 200px;
}

.select2_multi_sameline {
  width: 100%;
}

/* Добавьте остальные стили из вашего оригинального кода */
</style>