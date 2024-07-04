<template>
    <div class="col-sm-12">
        <label for="beerInput" class="form-label">Beer</label>
        <!-- Dropdown for beer selection -->
        <select class="form-select" id="beerInput" required>
            <option selected disabled value="">Choose...</option>
            <option value="1">Pils</option>
            <option value="2">Kölsch</option>
            <option value="3">Weizen</option>
            <option value="3">IPA</option>
            <option value="3">APA</option>
        </select>
        <div class="invalid-feedback">Please select a valid Beer.</div>
    </div>
</template>

<script setup lang="ts"></script>
